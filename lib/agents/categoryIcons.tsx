import {
  Monitor,
  Smartphone,
  AppWindow,
  Globe,
  Server,
  Sparkles,
  GraduationCap,
  Users,
  Plug,
  type LucideIcon,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "materiel-informatique": Monitor,
  "telephones-accessoires": Smartphone,
  "logiciels-saas": AppWindow,
  "services-web": Globe,
  "hebergement-domaines": Server,
  "outils-ia": Sparkles,
  formations: GraduationCap,
  "prestataires-freelances": Users,
  "apis-developpeurs": Plug,
};
