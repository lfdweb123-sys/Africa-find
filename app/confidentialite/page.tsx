import LegalLayout from "@/components/LegalLayout";
import { SITE_CONFIG } from "@/lib/site-config";

export default function ConfidentialitePage() {
  return (
    <LegalLayout
      kicker="Vos données"
      title="Politique de confidentialité"
      updated="18 septembre 2026"
    >
      <h2>Ce que nous collectons</h2>
      <p>Quand vous faites une recherche sur {SITE_CONFIG.productName}, nous traitons :</p>
      <ul>
        <li>Le texte de votre recherche et, si vous en envoyez une, la photo associée ;</li>
        <li>Le pays et la ville que vous indiquez pour la recherche ;</li>
        <li>Si vous nous contactez par WhatsApp, votre numéro de téléphone ;</li>
        <li>Si vous nous écrivez par email, votre adresse email.</li>
      </ul>

      <h2>Ce que nous ne collectons pas</h2>
      <p>
        {SITE_CONFIG.productName} ne demande pas de créer de compte pour
        rechercher. Nous ne collectons ni mot de passe, ni moyen de
        paiement, ni document d&rsquo;identité.
      </p>

      <h2>Ce que nous conservons</h2>
      <p>
        Pour chaque recherche, nous enregistrons uniquement des informations
        générales : la catégorie concernée, le pays et la ville demandés, le
        nombre de résultats trouvés, et la date. Ces informations servent à
        comprendre quelles catégories fonctionnent bien et où le service
        manque de résultats fiables.
      </p>
      <p>
        <strong>
          Nous ne conservons jamais les vendeurs, prix ou contacts trouvés
          lors d&rsquo;une recherche.
        </strong>{" "}
        Ils sont affichés au moment de la recherche puis ne sont pas gardés
        dans nos systèmes.
      </p>

      <h2>Photos envoyées</h2>
      <p>
        Une photo envoyée pour identifier un produit est utilisée
        uniquement pour cette recherche précise et n&rsquo;est pas conservée
        au-delà du traitement de la demande.
      </p>

      <h2>Partage avec des tiers</h2>
      <p>
        Nous ne vendons ni ne partageons vos informations personnelles à des
        fins publicitaires. Votre recherche peut amener notre système à
        consulter des pages publiques sur le web (sites, réseaux sociaux
        professionnels, marketplaces) pour trouver des résultats — cela ne
        transmet pas vos informations personnelles à ces sites.
      </p>

      <h2>Cookies</h2>
      <p>
        {SITE_CONFIG.productName} ne dépose pas de cookies publicitaires ou
        de traçage. Cette politique sera mise à jour si cela change.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez nous demander à tout moment quelles informations nous
        avons associées à votre numéro WhatsApp ou votre email, ou demander
        leur suppression, en écrivant à{" "}
        <a href={`mailto:${SITE_CONFIG.supportEmail}`}>{SITE_CONFIG.supportEmail}</a>.
      </p>

      <h2>Contact</h2>
      <p>
        Pour toute question sur cette politique : {SITE_CONFIG.supportEmail}{" "}
        ou {SITE_CONFIG.supportWhatsAppDisplay}.
      </p>
    </LegalLayout>
  );
}
