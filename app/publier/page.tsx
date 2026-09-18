import styles from "./page.module.css";
export default function PublierPage() {
  return (
    <main className={styles["page"]}>
      <p className={styles["kicker"]}>
        <span className={styles["dot"]} />
        Fournisseurs & prestataires
      </p>
      <h1>Référencer votre activité</h1>
      <p className={styles["sub"]}>
        Africa Find ne fonctionne pas encore avec un formulaire
        d&rsquo;inscription automatisé — le moteur explore le web ouvert à
        chaque recherche plutôt que de piocher dans un catalogue de fiches
        payantes. Si votre activité est déjà visible en ligne (site, page
        Facebook ou Instagram professionnelle, annonce sur une marketplace
        locale), elle peut déjà remonter dans les résultats.
      </p>

      <div className={styles["box"]}>
        <h2>Pour l&rsquo;instant, deux choses aident réellement :</h2>
        <ul>
          <li>
            Avoir une page ou un site avec vos produits/services, votre ville
            et un moyen de contact clairement indiqués.
          </li>
          <li>
            Nous écrire pour nous signaler votre activité, le temps qu&rsquo;un
            vrai système de référencement vérifié soit mis en place.
          </li>
        </ul>
      </div>
    </main>
  );
}
