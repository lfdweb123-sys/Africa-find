export const NICHE_DESCRIPTION =
  "informatique, numérique et Internet (matériel informatique, téléphones et accessoires, logiciels et SaaS, services web, hébergement et domaines, outils IA, formations en informatique/numérique, prestations de développeurs, graphistes et freelances du numérique, APIs et services pour développeurs)";

export interface NicheCategory {
  slug: string;
  label: string;
  hint: string;
  family: "prestataires" | "materiel" | "logiciels" | "autre";
}

export const NICHE_CATEGORIES: NicheCategory[] = [
  {
    slug: "materiel-informatique",
    label: "Matériel informatique",
    hint: "ordinateur, imprimante, routeur, onduleur...",
    family: "materiel",
  },
  {
    slug: "telephones-accessoires",
    label: "Téléphones & accessoires",
    hint: "smartphone, chargeur, écouteurs, coque...",
    family: "materiel",
  },
  {
    slug: "logiciels-saas",
    label: "Logiciels & SaaS",
    hint: "logiciel de gestion, CRM, ERP, licence...",
    family: "logiciels",
  },
  {
    slug: "services-web",
    label: "Services web",
    hint: "création de site, référencement, maintenance...",
    family: "prestataires",
  },
  {
    slug: "hebergement-domaines",
    label: "Hébergement & domaines",
    hint: "hébergement web, nom de domaine, serveur...",
    family: "logiciels",
  },
  {
    slug: "outils-ia",
    label: "Outils IA",
    hint: "génération d'images, chatbot, automatisation...",
    family: "logiciels",
  },
  {
    slug: "formations",
    label: "Formations numériques",
    hint: "formation développement, bureautique, design...",
    family: "prestataires",
  },
  {
    slug: "prestataires-freelances",
    label: "Développeurs, graphistes & freelances",
    hint: "développeur, designer, monteur vidéo freelance...",
    family: "prestataires",
  },
  {
    slug: "apis-developpeurs",
    label: "APIs pour développeurs",
    hint: "API de paiement, SMS, données, cartographie...",
    family: "logiciels",
  },
];

export function getCategoryBySlug(slug: string): NicheCategory | undefined {
  return NICHE_CATEGORIES.find((c) => c.slug === slug);
}

export function getCategoriesByFamily(
  family: NicheCategory["family"]
): NicheCategory[] {
  return NICHE_CATEGORIES.filter((c) => c.family === family);
}

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
