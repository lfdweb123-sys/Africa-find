import Link from "next/link";
import SearchExperience from "@/components/SearchExperience";
import { NICHE_CATEGORIES } from "@/lib/agents/niches";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles["page"]}>
      <section className={styles["hero"]}>
        <p className={styles["kicker"]}>
          <span className={styles["dot"]} />
          Recherche · numérique africain
        </p>
        <h1>
          Trouve ce qu&rsquo;il te faut,
          <br />
          dans le numérique africain.
        </h1>
        <p className={styles["sub"]}>
          Matériel informatique, téléphones, logiciels, hébergement,
          formations, freelances, APIs — décris ce que tu cherches, avec le
          pays et la ville, et le moteur explore le web en direct pour toi.
        </p>

        <SearchExperience />

        <p className={styles["honest-note"]}>
          Chaque recherche interroge le web au moment où tu la lances — rien
          n&rsquo;est stocké à l&rsquo;avance, il n&rsquo;y a pas de faux
          catalogue à jour.
        </p>
      </section>

      <section className={styles["categories"]}>
        <p className={styles["section-kicker"]}>
          <span className={styles["dot"]} />
          Explorer l&rsquo;écosystème
        </p>
        <h2>Les catégories couvertes aujourd&rsquo;hui</h2>
        <p className={styles["section-sub"]}>
          Le périmètre reste volontairement resserré sur l&rsquo;informatique
          et le numérique — c&rsquo;est ce qui permet des résultats fiables
          plutôt qu&rsquo;un fourre-tout.
        </p>

        <div className={styles["grid"]}>
          {NICHE_CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/categorie/${c.slug}`} className={styles["card"]}>
              <span className={styles["card-title"]}>{c.label}</span>
              <span className={styles["card-hint"]}>{c.hint}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles["cta"]}>
        <div className={styles["cta-text"]}>
          <p className={styles["cta-kicker"]}>Vous êtes fournisseur ou prestataire ?</p>
          <h2>
            Vous proposez des services ou du matériel tech en Afrique&nbsp;?
          </h2>
          <p className={styles["cta-sub"]}>
            Le moteur cherche sur le web ouvert — si votre activité est déjà
            visible en ligne (page Facebook, site, annonce), elle peut déjà
            ressortir dans les recherches. On travaille sur un moyen de vous
            référencer directement.
          </p>
        </div>
        <Link href="/publier" className={styles["cta-button"]}>
          En savoir plus
        </Link>
      </section>
    </main>
  );
}
