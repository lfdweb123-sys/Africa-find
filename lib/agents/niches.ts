export const NICHE_DESCRIPTION =
  "informatique, numérique et Internet (matériel informatique, téléphones et accessoires, logiciels et SaaS, services web, hébergement et domaines, outils IA, formations en informatique/numérique, prestations de développeurs, graphistes et freelances du numérique, APIs et services pour développeurs)";

export interface ExtractedResult {
  vendeur: string | null;
  produit_ou_service: string;
  prix: string | null;
  devise: string | null;
  pays: string;
  ville: string | null;
  quartier: string | null;
  contact: string | null;
  source_url: string;
  date_information: string | null;
  niche: string;
}

export interface OrchestratorInput {
  userText?: string;
  imageBase64?: string;
  imageMediaType?: string;
  pays?: string;
  ville?: string;
}

export interface OrchestratorResult {
  status: "hors_perimetre" | "besoin_precision" | "ok";
  message: string;
  niche?: string;
  nbResultats?: number;
}
