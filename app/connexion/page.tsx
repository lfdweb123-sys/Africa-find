import styles from "./page.module.css";
export default function ConnexionPage() {
  return (
    <main className={styles["page"]}>
      <p className={styles["kicker"]}>
        <span className={styles["dot"]} />
        Espace compte
      </p>
      <h1>Les comptes arrivent bientôt</h1>
      <p className={styles["sub"]}>
        Aujourd&rsquo;hui, Africa Find fonctionne sans compte : chaque
        recherche est traitée à la volée, sans historique lié à une identité.
        Un espace compte (historique de recherches, favoris, alertes) est
        prévu pour la suite.
      </p>
    </main>
  );
}
