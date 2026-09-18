"use client";

import { useState } from "react";
import { Bell, MailCheck } from "lucide-react";
import { useEmailLinkAuth } from "@/hooks/useEmailLinkAuth";
import styles from "./page.module.css";

export default function NewsletterPage() {
  const { user, linkStatus, errorMessage, unavailable, sendLink } =
    useEmailLinkAuth("/newsletter");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) sendLink(email);
  }

  const alreadyIn = Boolean(user) || linkStatus === "sent";

  return (
    <main className={styles["page"]}>
      <span className={styles["icon"]}>
        <Bell size={26} strokeWidth={1.7} />
      </span>
      <p className={styles["kicker"]}>
        <span className={styles["dot"]} />
        Rester informé
      </p>
      <h1>Sois averti des nouveautés</h1>
      <p className={styles["sub"]}>
        Nouvelles catégories, nouvelles fonctionnalités, ouverture des
        comptes — laisse ton email pour être prévenu. Une seule adresse, pas
        de spam.
      </p>

      {user && (
        <div className={styles["success"]}>
          <MailCheck size={18} strokeWidth={1.8} />
          <span>Tu es inscrit avec {user.email}.</span>
        </div>
      )}

      {!user && linkStatus === "sent" && (
        <div className={styles["success"]}>
          <MailCheck size={18} strokeWidth={1.8} />
          <span>
            Vérifie ta boîte mail ({email}) et clique sur le lien de
            confirmation depuis cet appareil.
          </span>
        </div>
      )}

      {!alreadyIn && !unavailable && (
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["input"]}
          />
          <button
            type="submit"
            className={styles["submit"]}
            disabled={linkStatus === "sending"}
          >
            {linkStatus === "sending" ? "Envoi…" : "M'inscrire"}
          </button>
        </form>
      )}

      {linkStatus === "error" && errorMessage && (
        <p className={styles["error"]}>{errorMessage}</p>
      )}

      {unavailable && (
        <p className={styles["error"]}>
          L&rsquo;inscription par email n&rsquo;est pas encore activée sur ce
          déploiement.
        </p>
      )}
    </main>
  );
}
