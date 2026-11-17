import { createServerFn } from "@tanstack/react-start";
import { suggestFor } from "@/lib/suggest";

export type ChatTurn = { role: "user" | "assistant"; content: string };

export type ChatTask = { title: string; priority: "high" | "normal" };

export type ChatReply = {
  text: string;
  tasks: ChatTask[];
  source: "groq" | "local";
};

type ChatInput = {
  eventTitle: string;
  eventDescription: string;
  messages: ChatTurn[];
};

function localReply(input: ChatInput): ChatReply {
  const plan = suggestFor(input.eventTitle, input.eventDescription);
  return {
    text: `${plan.reason} Here are the jobs a campus team usually opens first.`,
    tasks: plan.tasks,
    source: "local",
  };
}

function parseTasks(raw: string): ChatTask[] {
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

function visibleText(raw: string) {
  return raw.replace(/\{[\s\S]*"tasks"[\s\S]*\}/, "").trim();
}

export const askHive = createServerFn({ method: "POST" }).handler(
  async ({ data }: { data: ChatInput }): Promise<ChatReply> => {
    const input = data;
    if (!input?.eventTitle || !Array.isArray(input.messages)) {
      return { text: "Hi. Ask me anything.", tasks: [], source: "local" };
    }

    const last = input.messages.at(-1)?.content?.toLowerCase().trim() ?? "";
    const isGreeting = /^(hi|hii|hello|hey|yo|sup|good morning|good evening|how are you)\b/.test(last);

    const key = process.env.GROQ_API_KEY?.trim();
    if (!key) {
      return isGreeting
        ? { text: "Hi. I am Hive AI. Ask me anything about this event, or just chat.", tasks: [], source: "local" }
        : localReply(input);
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
          messages: [{ role: "system", content: system }, ...input.messages.slice(-8)],
        }),
      });

      if (!response.ok) {
        return isGreeting
          ? { text: "Hi. I am Hive AI. Ask me anything about this event, or just chat.", tasks: [], source: "local" }
          : localReply(input);
      }
      const payload = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const raw = payload.choices?.[0]?.message?.content?.trim();
      if (!raw) {
        return isGreeting
          ? { text: "Hi. I am Hive AI. Ask me anything about this event, or just chat.", tasks: [], source: "local" }
          : localReply(input);
      }

      const tasks = parseTasks(raw);
      return {
        text: visibleText(raw) || "Hi. How can I help?",
        tasks: isGreeting ? [] : tasks,
        source: "groq",
      };
    } catch {
      return isGreeting
        ? { text: "Hi. I am Hive AI. Ask me anything about this event, or just chat.", tasks: [], source: "local" }
        : localReply(input);
    }
  },
);
