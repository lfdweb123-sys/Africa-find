import Anthropic from "@anthropic-ai/sdk";

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn("ANTHROPIC_API_KEY manquant — les agents IA échoueront.");
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const MODEL = "claude-sonnet-4-6";

/**
 * Appelle un agent texte simple : system prompt + message utilisateur.
 * webSearch: active l'outil de recherche web côté API.
 */
export async function callAgent(
  systemPrompt: string,
  userMessage: string,
  opts: { webSearch?: boolean; maxTokens?: number } = {}
): Promise<string> {
  const { webSearch = false, maxTokens = 2000 } = opts;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
    ...(webSearch
      ? {
          tools: [
            {
              type: "web_search_20250305" as const,
              name: "web_search",
            },
          ],
        }
      : {}),
  });

  return response.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .filter(Boolean)
    .join("\n");
}

/**
 * Appelle un agent avec une image en entrée (base64) + texte optionnel.
 */
export async function callAgentWithImage(
  systemPrompt: string,
  imageBase64: string,
  mediaType: string,
  userText: string,
  opts: { maxTokens?: number } = {}
): Promise<string> {
  const { maxTokens = 1000 } = opts;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: mediaType as
                | "image/jpeg"
                | "image/png"
                | "image/gif"
                | "image/webp",
              data: imageBase64,
            },
          },
          { type: "text", text: userText || "Identifie ce produit." },
        ],
      },
    ],
  });

  return response.content
    .map((block) => (block.type === "text" ? block.text : ""))
    .filter(Boolean)
    .join("\n");
}

/**
 * Extrait un tableau/objet JSON d'une réponse texte, en retirant
 * d'éventuelles balises markdown ```json ... ```.
 */
export function parseJsonSafe<T>(raw: string, fallback: T): T {
  try {
    const cleaned = raw.replace(/```json|```/g, "").trim();
    return JSON.parse(cleaned) as T;
  } catch (err) {
    console.error("Échec de parsing JSON:", err, "\nContenu brut:", raw);
    return fallback;
  }
}
