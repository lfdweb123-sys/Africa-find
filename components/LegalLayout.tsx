import styles from "./LegalLayout.module.css";

export default function LegalLayout({
  kicker,
  title,
  updated,
  children,
}: {
  kicker: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <main className={styles["page"]}>
      <p className={styles["kicker"]}>
        <span className={styles["dot"]} />
        {kicker}
      </p>
      <h1>{title}</h1>
      <p className={styles["updated"]}>Dernière mise à jour : {updated}</p>
      <div className={styles["prose"]}>{children}</div>
    </main>
  );
}
