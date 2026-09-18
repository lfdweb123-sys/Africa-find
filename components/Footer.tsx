import Link from "next/link";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { NICHE_CATEGORIES } from "@/lib/agents/niches";
import { SITE_CONFIG, whatsAppLink } from "@/lib/site-config";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-inner"]}>
        <div className={styles["brand-col"]}>
          <p className={styles["brand"]}>
            <span className={styles["brand-mark"]}>AF</span>
            {SITE_CONFIG.productName}
          </p>
          <p className={styles["desc"]}>
            Un moteur de recherche qui explore le web en direct pour trouver
            du matériel, des logiciels et des prestataires numériques en
            Afrique — sans catalogue figé.
          </p>

          <div className={styles["contact"]}>
            <a href={`mailto:${SITE_CONFIG.supportEmail}`} className={styles["contact-item"]}>
              <Mail size={15} strokeWidth={1.8} />
              {SITE_CONFIG.supportEmail}
            </a>
            <a
              href={whatsAppLink("Bonjour, j'ai une question sur Africa Find.")}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["contact-item"]}
            >
              <MessageCircle size={15} strokeWidth={1.8} />
              {SITE_CONFIG.supportWhatsAppDisplay}
            </a>
            <span className={styles["contact-item"]}>
              <MapPin size={15} strokeWidth={1.8} />
              {SITE_CONFIG.location}
            </span>
          </div>
        </div>

        <div className={styles["col"]}>
          <p className={styles["heading"]}>Catégories</p>
          {NICHE_CATEGORIES.slice(0, 4).map((c) => (
            <Link key={c.slug} href={`/categorie/${c.slug}`} className={styles["item"]}>
              {c.label}
            </Link>
          ))}
        </div>

        <div className={styles["col"]}>
          <p className={styles["heading"]}>Ressources</p>
          <Link href="/ecosysteme" className={styles["item"]}>
            Comment ça marche
          </Link>
          <Link href="/publier" className={styles["item"]}>
            Référencer mon activité
          </Link>
          <Link href="/status" className={styles["item"]}>
            Statut du service
          </Link>
        </div>

        <div className={styles["col"]}>
          <p className={styles["heading"]}>Légal</p>
          <Link href="/mentions-legales" className={styles["item"]}>
            Mentions légales
          </Link>
          <Link href="/confidentialite" className={styles["item"]}>
            Confidentialité
          </Link>
          <Link href="/conditions-utilisation" className={styles["item"]}>
            Conditions d&rsquo;utilisation
          </Link>
        </div>
      </div>

      <div className={styles["footer-bottom"]}>
        <span>
          © {new Date().getFullYear()} {SITE_CONFIG.companyLegalName}.
        </span>
        <span>Résultats générés à la demande, jamais stockés.</span>
      </div>
    </footer>
  );
}
