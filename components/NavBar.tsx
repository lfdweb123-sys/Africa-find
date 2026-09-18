"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./NavBar.module.css";

const links = [
  { href: "/ecosysteme", label: "Explorer l'écosystème" },
  { href: "/categorie/prestataires-freelances", label: "Prestataires & Freelances" },
  { href: "/categorie/materiel-informatique", label: "Matériel & Télécoms" },
  { href: "/categorie/logiciels-saas", label: "API & Logiciels" },
  { href: "/status", label: "Statut" },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`${styles["nav"]} ${scrolled ? styles["nav-scrolled"] : ""}`}>
      <div className={styles["nav-inner"]}>
        <Link href="/" className={styles["brand"]} onClick={() => setOpen(false)}>
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

        <button
          type="button"
          className={styles["burger"]}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={open ? styles["burger-open"] : ""} />
          <span className={open ? styles["burger-open"] : ""} />
          <span className={open ? styles["burger-open"] : ""} />
        </button>
      </div>

      <div className={`${styles["mobile-panel"]} ${open ? styles["mobile-panel-open"] : ""}`}>
        <nav className={styles["mobile-links"]}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles["mobile-link"]}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className={styles["mobile-actions"]}>
          <Link href="/publier" className={styles["cta"]} onClick={() => setOpen(false)}>
            Publier une annonce
          </Link>
          <Link href="/connexion" className={styles["ghost"]} onClick={() => setOpen(false)}>
            Se connecter
          </Link>
        </div>
      </div>
    </header>
  );
}
