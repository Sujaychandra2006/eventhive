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

export const askHive = createServerFn({ method: "POST" })
  .inputValidator((data: ChatInput) => data)
  .handler(async ({ data }): Promise<ChatReply> => {
    const input = data;
    if (!input?.eventTitle || !Array.isArray(input.messages)) {
      return { text: "Pick an event and type a question.", tasks: [], source: "local" };
    }

    const key = process.env.GROQ_API_KEY?.trim();
    if (!key) return localReply(input);

    const system = [
      "You are Hive AI, the planner for EventHive, a campus event board.",
      "Help a student team plan the event. Be short and practical.",
      `Event: ${input.eventTitle}.`,
      `Details: ${input.eventDescription || "No description."}.`,
      "Reply in plain sentences, then end with one JSON object only:",
      '{"tasks":[{"title":"Confirm the venue","priority":"high"}]}',
      "Give 3 to 5 tasks. priority is high or normal. No markdown fences.",
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
          temperature: 0.4,
          max_tokens: 500,
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
        tasks: tasks.length ? tasks : localReply(input).tasks,
        source: "groq",
      };
    } catch {
      return localReply(input);
    }
  });
