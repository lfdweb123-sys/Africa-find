import LegalLayout from "@/components/LegalLayout";
import { SITE_CONFIG } from "@/lib/site-config";

export default function ConditionsUtilisationPage() {
  return (
    <LegalLayout
      kicker="Règles d'utilisation"
      title="Conditions d&rsquo;utilisation"
      updated="18 septembre 2026"
    >
      <h2>Objet</h2>
      <p>
        {SITE_CONFIG.productName} est un service édité par{" "}
        {SITE_CONFIG.companyLegalName} qui aide à trouver, sur le web
        ouvert, du matériel informatique, des logiciels, des services
        numériques et des prestataires en Afrique. En utilisant le service,
        vous acceptez les présentes conditions.
      </p>

      <h2>Nature du service</h2>
      <p>
        {SITE_CONFIG.productName} ne vend rien directement et n&rsquo;est
        partie à aucune transaction entre un utilisateur et un vendeur ou
        prestataire trouvé via une recherche. Le service se limite à
        présenter des informations trouvées publiquement au moment de la
        recherche.
      </p>

      <h2>Exactitude des résultats</h2>
      <p>
        Les prix, disponibilités et coordonnées affichés proviennent de
        sources publiques tierces et peuvent être inexacts, obsolètes ou
        incomplets. {SITE_CONFIG.productName} ne garantit pas
        l&rsquo;exactitude de ces informations et invite chaque utilisateur
        à les vérifier directement auprès du vendeur ou prestataire avant
        toute transaction ou paiement.
      </p>

      <h2>Utilisation autorisée</h2>
      <p>En utilisant {SITE_CONFIG.productName}, vous vous engagez à :</p>
      <ul>
        <li>Ne pas utiliser le service à des fins illégales ou frauduleuses ;</li>
        <li>
          Ne pas tenter de perturber, surcharger ou contourner le
          fonctionnement normal du service ;
        </li>
        <li>
          Ne pas soumettre de contenu (texte ou image) illégal, trompeur ou
          portant atteinte aux droits d&rsquo;un tiers.
        </li>
      </ul>

      <h2>Limitation de responsabilité</h2>
      <p>
        {SITE_CONFIG.companyLegalName} ne pourra être tenue responsable
        d&rsquo;un litige, d&rsquo;une perte financière ou d&rsquo;un
        préjudice résultant d&rsquo;une transaction conclue avec un vendeur
        ou prestataire trouvé via le service.
      </p>

      <h2>Évolution du service</h2>
      <p>
        {SITE_CONFIG.productName} est en développement continu. Certaines
        fonctionnalités (comptes utilisateurs, référencement des
        prestataires) peuvent évoluer ou être ajoutées ; les présentes
        conditions seront mises à jour en conséquence.
      </p>

      <h2>Droit applicable</h2>
      <p>Les présentes conditions sont régies par le droit béninois.</p>

      <h2>Contact</h2>
      <p>
        Pour toute question : {SITE_CONFIG.supportEmail} ou{" "}
        {SITE_CONFIG.supportWhatsAppDisplay}.
      </p>
    </LegalLayout>
  );
}
