import Link from "next/link";
import styles from "./NavBar.module.css";

const links = [
  { href: "/ecosysteme", label: "Explorer l'écosystème" },
  { href: "/categorie/prestataires-freelances", label: "Prestataires & Freelances" },
  { href: "/categorie/materiel-informatique", label: "Matériel & Télécoms" },
  { href: "/categorie/logiciels-saas", label: "API & Logiciels" },
];

export default function NavBar() {
  return (
    <header className={styles["nav"]}>
      <div className={styles["nav-inner"]}>
        <Link href="/" className={styles["brand"]}>
          <span className={styles["brand-mark"]}>AF</span>
          Africa Find
        </Link>
        <nav className={styles["links"]}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles["link"]}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className={styles["actions"]}>
          <Link href="/publier" className={styles["cta"]}>
            Publier une annonce
          </Link>
          <Link href="/connexion" className={styles["ghost"]}>
            Se connecter
          </Link>
        </div>
      </div>
    </header>
  );
}
