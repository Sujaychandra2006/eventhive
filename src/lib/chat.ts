import { createServerFn } from "@tanstack/react-start";
import { suggestFor } from "@/lib/suggest";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatTask = { title: string; priority: "high" | "normal" };

export type ChatChunk = {
  text: string;
  done?: boolean;
  tasks?: ChatTask[];
  source?: "groq" | "local";
};

type ChatInput = {
  eventTitle: string;
  eventDescription: string;
  messages: ChatTurn[];
};

function localTasks(input: ChatInput): ChatTask[] {
  return suggestFor(input.eventTitle, input.eventDescription).tasks;
}

export function parseTasks(raw: string): ChatTask[] {
  const match = raw.match(/\{[\s\S]*"tasks"[\s\S]*\}/);
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[0]) as { tasks?: Array<{ title?: string; priority?: string }> };
    return (parsed.tasks ?? [])
      .filter((item) => typeof item.title === "string" && item.title.trim())
      .slice(0, 6)
      .map((item) => ({
        title: item.title!.trim(),
        priority: item.priority === "high" ? "high" : "normal",
      }));
  } catch {
    return [];
  }
}

export function visibleText(raw: string) {
  return raw.replace(/\{[\s\S]*"tasks"[\s\S]*\}/, "").trim();
}

export const streamHive = createServerFn({ method: "POST" }).handler(
  async function* ({ data }: { data: ChatInput }): AsyncGenerator<ChatChunk> {
    const input = data;
    if (!input?.eventTitle || !Array.isArray(input.messages)) {
      yield { text: "Hi. Ask me anything.", done: true, source: "local" };
      return;
    }

    const last = input.messages.at(-1)?.content?.toLowerCase().trim() ?? "";
    const isGreeting = /^(hi|hii|hello|hey|yo|sup|good morning|good evening|how are you)\b/.test(last);
    const key = process.env.GROQ_API_KEY?.trim();

    if (!key) {
      const text = isGreeting
        ? "Hi. I am Hive AI. Ask me anything about this event, or just chat."
        : "Groq is not connected. Here is the usual campus checklist.";
      yield { text, done: true, tasks: isGreeting ? [] : localTasks(input), source: "local" };
      return;
    }

    const system = [
      "You are Hive AI, a friendly real chatbot inside the EventHive campus app.",
      "Answer every message like a normal AI assistant. If someone says hi, hello, or how are you, reply naturally and offer help.",
      "You can answer general questions, explain things, and chat. Do not force event tasks unless the user asks about planning.",
      `The open event is ${input.eventTitle}. Details: ${input.eventDescription || "No description."}.`,
      "Only when the user asks for a plan, tasks, or what to do for the event, end with one JSON object:",
      '{"tasks":[{"title":"Confirm the venue","priority":"high"}]}',
      "priority is high or normal. No markdown fences. For greetings and other questions, do not add JSON.",
    ].join(" ");

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b",
          temperature: 0.8,
          max_tokens: 900,
          stream: true,
          messages: [{ role: "system", content: system }, ...input.messages.slice(-8)],
        }),
      });

      if (!response.ok || !response.body) {
        yield {
          text: isGreeting ? "Hi. I am Hive AI." : "Groq did not reply. Try again.",
          done: true,
          tasks: isGreeting ? [] : localTasks(input),
          source: "local",
        };
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let full = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const payload = trimmed.slice(5).trim();
          if (!payload || payload === "[DONE]") continue;
          try {
            const parsed = JSON.parse(payload) as {
              choices?: Array<{ delta?: { content?: string } }>;
            };
            const piece = parsed.choices?.[0]?.delta?.content ?? "";
            if (piece) {
              full += piece;
              yield { text: piece, source: "groq" };
            }
          } catch {
            /* ignore partial chunks */
          }
        }
      }

      const tasks = isGreeting ? [] : parseTasks(full);
      yield { text: "", done: true, tasks, source: "groq" };
    } catch {
      yield {
        text: isGreeting ? "Hi. I am Hive AI." : "The chat could not reach Groq.",
        done: true,
        tasks: isGreeting ? [] : localTasks(input),
        source: "local",
      };
    }
  },
);
