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
      return { text: "Pick an event and type a question.", tasks: [], source: "local" };
    }

    const key = process.env.GROQ_API_KEY?.trim();
    if (!key) return localReply(input);

    const system = [
      "You are Hive AI, a helpful campus event planner for EventHive.",
      "Answer any question the student asks, in clear plain language, the way a good assistant would.",
      "Explain why, give steps, and give options when useful. Do not only list tasks.",
      `The current event is ${input.eventTitle}.`,
      `Event details: ${input.eventDescription || "No description."}.`,
      "If the question is about planning this event, end your reply with one JSON object of 3 to 5 jobs:",
      '{"tasks":[{"title":"Confirm the venue","priority":"high"}]}',
      "priority is high or normal. No markdown fences. If the question is not about tasks, skip the JSON.",
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
          temperature: 0.7,
          max_tokens: 900,
          messages: [{ role: "system", content: system }, ...input.messages.slice(-8)],
        }),
      });

      if (!response.ok) return localReply(input);
      const payload = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const raw = payload.choices?.[0]?.message?.content?.trim();
      if (!raw) return localReply(input);

      const tasks = parseTasks(raw);
      return {
        text: visibleText(raw) || "Here is a plan for this event.",
        tasks,
        source: "groq",
      };
    } catch {
      return localReply(input);
    }
  },
);
