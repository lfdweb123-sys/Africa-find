import { notFound } from "next/navigation";
import Link from "next/link";
import SearchExperience from "@/components/SearchExperience";
import { NICHE_CATEGORIES, getCategoryBySlug } from "@/lib/agents/niches";
import styles from "./page.module.css";

export function generateStaticParams() {
  return NICHE_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default function CategoriePage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const others = NICHE_CATEGORIES.filter((c) => c.slug !== category!.slug);

  return (
    <main className={styles["page"]}>
      <section className={styles["hero"]}>
        <p className={styles["kicker"]}>
          <span className={styles["dot"]} />
          Catégorie
        </p>
        <h1>{category!.label}</h1>
        <p className={styles["sub"]}>
          Exemples : {category!.hint} — précise le pays et la ville pour de
          meilleurs résultats.
        </p>

        <SearchExperience
          placeholder={`Ex: ${category!.hint.split(",")[0]}`}
          showSuggestions={false}
        />
      </section>

      <section className={styles["others"]}>
        <p className={styles["others-label"]}>Autres catégories</p>
        <div className={styles["chips"]}>
          {others.map((c) => (
            <Link key={c.slug} href={`/categorie/${c.slug}`} className={styles["chip"]}>
              {c.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
