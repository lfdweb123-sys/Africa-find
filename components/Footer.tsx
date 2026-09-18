import Link from "next/link";
import { NICHE_CATEGORIES } from "@/lib/agents/niches";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={styles["footer-inner"]}>
        <div className="col brand-col">
          <p className={styles["brand"]}>
            <span className={styles["brand-mark"]}>AF</span>
            Africa Find
          </p>
          <p className={styles["desc"]}>
            Un moteur de recherche qui explore le web en direct pour trouver
            du matériel, des logiciels et des prestataires numériques en
            Afrique — sans catalogue figé.
          </p>
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
        </div>

        <div className={styles["col"]}>
          <p className={styles["heading"]}>Plateforme</p>
          <Link href="/connexion" className={styles["item"]}>
            Espace compte
          </Link>
        </div>
      </div>

      <div className={styles["footer-bottom"]}>
        <span>© {new Date().getFullYear()} Africa Find.</span>
        <span>Résultats générés à la demande, jamais stockés.</span>
      </div>
    </footer>
  );
}
