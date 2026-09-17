import { searchText } from "./searchText";
import { searchImage } from "./searchImage";
import { extractStructured } from "./extract";
import { formatResponse } from "./formatResponse";
import { logRequete } from "./logging";
import { OrchestratorInput, OrchestratorResult, ExtractedResult } from "./niches";

const HORS_PERIMETRE_MSG =
  "Cette recherche ne fait pas partie des catégories couvertes par Africa Find pour le moment : informatique, numérique et Internet (matériel informatique, téléphones et accessoires, logiciels et SaaS, services web, hébergement et domaines, outils IA, formations en informatique/numérique, prestations de développeurs, graphistes et freelances du numérique, APIs et services pour développeurs).";

/**
 * Point d'entrée unique : reçoit texte et/ou image + pays/ville optionnels,
 * fait passer la requête par toute la chaîne d'agents, journalise dans
 * Firestore, et retourne le message final prêt à envoyer sur WhatsApp.
 */
export async function runOrchestrator(
  input: OrchestratorInput,
  userId: string | null
): Promise<OrchestratorResult> {
  const { userText, imageBase64, imageMediaType, pays, ville } = input;

  if (!pays) {
    return {
      status: "besoin_precision",
      message:
        "Pour quel pays (et idéalement quelle ville) veux-tu que je cherche ?",
    };
  }

  // Étape 1 : si image, on la transforme d'abord en requête texte.
  let effectiveQuery = userText?.trim() ?? "";

  if (imageBase64 && imageMediaType) {
    const imageResult = await searchImage(
      imageBase64,
      imageMediaType,
      userText ?? ""
    );

    if (imageResult.trim().startsWith("Objet hors périmètre")) {
      await logRequete({
        userId,
        type: "image",
        contenu_requete: userText ?? "[image]",
        niche_detectee: null,
        pays_cible: pays,
        ville_cible: ville ?? null,
        nb_resultats_trouves: 0,
      });
      return { status: "hors_perimetre", message: HORS_PERIMETRE_MSG };
    }

    effectiveQuery = imageResult.trim();
  }

  if (!effectiveQuery) {
    return {
      status: "besoin_precision",
      message: "Peux-tu préciser ce que tu recherches ?",
    };
  }

  // Étape 2 : recherche web dans le périmètre, avec pays/ville injectés.
  const queryWithLocation = ville
    ? `${effectiveQuery} — pays: ${pays}, ville: ${ville}`
    : `${effectiveQuery} — pays: ${pays}`;

  const rawResults = await searchText(queryWithLocation);

  // Étape 3 : extraction structurée (le schéma JSON exclut déjà
  // tout résultat dont la niche ne correspond à aucune valeur autorisée).
  const structured: ExtractedResult[] = await extractStructured(rawResults);

  const niche = structured[0]?.niche ?? null;

  // Étape 4 : journalisation (métadonnées uniquement, jamais les résultats).
  const type: "texte" | "image" = imageBase64 ? "image" : "texte";
  await logRequete({
    userId,
    type,
    contenu_requete: userText ?? effectiveQuery,
    niche_detectee: niche,
    pays_cible: pays,
    ville_cible: ville ?? null,
    nb_resultats_trouves: structured.length,
  });

  if (structured.length === 0) {
    return {
      status: "hors_perimetre",
      message: HORS_PERIMETRE_MSG,
    };
  }

  // Étape 5 : formatage WhatsApp final.
  const finalMessage = await formatResponse(structured, effectiveQuery);

  return {
    status: "ok",
    message: finalMessage,
    niche: niche ?? undefined,
    nbResultats: structured.length,
  };
}
