export const SITE_CONFIG = {
  productName: "Africa Find",
  companyLegalName: "La Faveur Infinie de Dieu",
  supportEmail: "support@africafind.com",
  supportWhatsAppDisplay: "+229 90 08 38 57",
  supportWhatsAppNumber: "22990083857",
  location: "Cotonou, Bénin",
};

export function whatsAppLink(message?: string): string {
  const base = `https://wa.me/${SITE_CONFIG.supportWhatsAppNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
