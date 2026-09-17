import { callAgent, parseJsonSafe } from "../anthropic";
import { NICHE_DESCRIPTION, ExtractedResult } from "./niches";

const SYSTEM_PROMPT = `Tu es l'agent d'extraction structurée d'AFRICA FIND.

ENTRÉE : une liste brute de résultats de recherche (texte non structuré, provenant de l'agent de recherche web).

TÂCHE : convertis chaque résultat en un objet JSON respectant strictement ce schéma, sans ajouter ni inventer de champ :

{
  "vendeur": "string ou null",
  "produit_ou_service": "string",
  "prix": "string ou null",
  "devise": "string ou null",
  "pays": "string",
  "ville": "string ou null",
  "quartier": "string ou null",
  "contact": "string ou null",
  "source_url": "string",
  "date_information": "string ou null",
  "niche": "string (doit être une valeur exacte parmi : ${NICHE_DESCRIPTION})"
}

RÈGLES :
- Un champ inconnu est mis à null, jamais deviné.
- Le champ "niche" doit obligatoirement correspondre à une valeur de la liste autorisée ; si aucune ne correspond, exclus complètement ce résultat du tableau final (ne le mets pas avec une niche approximative).
- Réponds UNIQUEMENT avec un tableau JSON valide, sans texte avant ni après, sans balises markdown.`;

export async function extractStructured(
  rawResults: string
): Promise<ExtractedResult[]> {
  const raw = await callAgent(SYSTEM_PROMPT, rawResults, { maxTokens: 3000 });
  return parseJsonSafe<ExtractedResult[]>(raw, []);
}
