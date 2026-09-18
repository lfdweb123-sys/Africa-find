import LegalLayout from "@/components/LegalLayout";
import { SITE_CONFIG } from "@/lib/site-config";

export default function MentionsLegalesPage() {
  return (
    <LegalLayout
      kicker="Informations légales"
      title="Mentions légales"
      updated="18 septembre 2026"
    >
      <h2>Éditeur du site</h2>
      <p>
        Le service {SITE_CONFIG.productName} est édité par{" "}
        <strong>{SITE_CONFIG.companyLegalName}</strong>, dont l&rsquo;activité
        est basée à {SITE_CONFIG.location}.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question relative au site ou à son contenu :
        <br />
        Email : <a href={`mailto:${SITE_CONFIG.supportEmail}`}>{SITE_CONFIG.supportEmail}</a>
        <br />
        WhatsApp : {SITE_CONFIG.supportWhatsAppDisplay}
      </p>

      <h2>Activité du service</h2>
      <p>
        {SITE_CONFIG.productName} est un moteur de recherche qui aide à
        trouver, sur le web ouvert, du matériel informatique, des logiciels,
        des services numériques et des prestataires (développeurs,
        graphistes, freelances) en Afrique. Le service ne vend rien
        directement : il oriente vers des vendeurs et prestataires tiers.
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé sur une infrastructure cloud sécurisée fournie
        par un prestataire technique tiers.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        La structure du site, son design et ses textes sont la propriété de{" "}
        {SITE_CONFIG.companyLegalName}, sauf mention contraire. Les
        informations sur les vendeurs et prestataires affichées dans les
        résultats de recherche proviennent de sources publiques tierces et
        restent la propriété de leurs auteurs respectifs.
      </p>

      <h2>Responsabilité</h2>
      <p>
        {SITE_CONFIG.productName} affiche des informations trouvées
        publiquement sur le web (prix, contacts, disponibilité) au moment de
        la recherche. Ces informations peuvent changer sans préavis de la
        part des vendeurs et prestataires concernés. Il appartient à
        l&rsquo;utilisateur de vérifier ces informations directement auprès
        du vendeur ou prestataire avant toute transaction.
      </p>
    </LegalLayout>
  );
}
