import { env } from "../../config/env";

type GeminiGenerationOptions = {
  maxOutputTokens?: number;
  responseMimeType?: "application/json" | "text/plain";
  temperature?: number;
};

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
  error?: {
    message?: string;
  };
};

export function isGeminiEnabled() {
  return env.AI_PROVIDER.toLowerCase() === "gemini" && Boolean(env.GEMINI_API_KEY);
}

function parseJsonBlock(text: string) {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced?.[1] ?? trimmed;
}

export async function generateGeminiText(prompt: string, options: GeminiGenerationOptions = {}) {
  if (!env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const endpoint = new URL(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(env.GEMINI_MODEL)}:generateContent`
  );
  endpoint.searchParams.set("key", env.GEMINI_API_KEY);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: options.temperature ?? 0.35,
        topP: 0.9,
        maxOutputTokens: options.maxOutputTokens ?? 2048,
        ...(options.responseMimeType ? { responseMimeType: options.responseMimeType } : {})
      }
    })
  });

  const payload = (await response.json().catch(() => ({}))) as GeminiResponse;
  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Gemini request failed with status ${response.status}`);
  }

  const text = payload.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("").trim();
  if (!text) {
    throw new Error("Gemini response did not include text");
  }

  return text;
}

export async function generateGeminiJson<T>(prompt: string, options: GeminiGenerationOptions = {}) {
  const text = await generateGeminiText(prompt, {
    ...options,
    responseMimeType: "application/json"
  });
  return JSON.parse(parseJsonBlock(text)) as T;
}
