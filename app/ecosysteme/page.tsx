import Link from "next/link";
import { NICHE_CATEGORIES } from "@/lib/agents/niches";
import styles from "./page.module.css";

export default function EcosystemePage() {
  const steps = [
    {
      title: "Tu décris ta recherche",
      text: "Un produit, un service, une formation, un freelance — en texte, en photo, ou les deux, avec le pays et la ville.",
    },
    {
      title: "Le moteur explore le web en direct",
      text: "Marketplaces, pages professionnelles, sites de fournisseurs — uniquement dans la niche informatique/numérique et dans la zone demandée.",
    },
    {
      title: "Tout ce qui est hors périmètre est écarté",
      text: "Pas de vendeur, prix ou contact inventé : un champ non trouvé reste vide plutôt que d'être deviné.",
    },
    {
      title: "Tu reçois une réponse triée",
      text: "Les résultats les plus pertinents, avec comment contacter chaque fournisseur.",
    },
  ];

  return (
    <main className={styles["page"]}>
      <section className={styles["hero"]}>
        <p className={styles["kicker"]}>
          <span className={styles["dot"]} />
          Explorer l&rsquo;écosystème
        </p>
        <h1>Comment fonctionne Africa Find</h1>
        <p className={styles["sub"]}>
          Pas d&rsquo;annuaire figé à maintenir : chaque recherche interroge
          le web au moment où elle est posée, dans un périmètre volontairement
          restreint.
        </p>
      </section>

      <section className={styles["steps"]}>
        {steps.map((s, i) => (
          <div key={s.title} className={styles["step"]}>
            <span className={styles["step-num"]}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={styles["categories"]}>
        <h2>Les 9 catégories couvertes</h2>
        <div className={styles["grid"]}>
          {NICHE_CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/categorie/${c.slug}`} className={styles["card"]}>
              <span className={styles["card-title"]}>{c.label}</span>
              <span className={styles["card-hint"]}>{c.hint}</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
