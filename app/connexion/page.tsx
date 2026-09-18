"use client";

import { useState } from "react";
import { UserRound, MailCheck, LogOut } from "lucide-react";
import { useEmailLinkAuth } from "@/hooks/useEmailLinkAuth";
import styles from "./page.module.css";

export default function ConnexionPage() {
  const { user, linkStatus, errorMessage, unavailable, sendLink, logout } =
    useEmailLinkAuth("/connexion");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) sendLink(email);
  }

  return (
    <main className={styles["page"]}>
      <span className={styles["icon"]}>
        <UserRound size={26} strokeWidth={1.7} />
      </span>
      <p className={styles["kicker"]}>
        <span className={styles["dot"]} />
        Espace compte
      </p>
      <h1>Se connecter</h1>
      <p className={styles["sub"]}>
        Pas de mot de passe à retenir : on t&rsquo;envoie un lien par email,
        tu cliques dessus et c&rsquo;est fait.
      </p>

      {user === undefined && !unavailable && (
        <p className={styles["loading"]}>Vérification de ta session…</p>
      )}

      {user && (
        <div className={styles["account"]}>
          <p className={styles["accountEmail"]}>{user.email}</p>
          <p className={styles["accountNote"]}>Tu es connecté.</p>
          <button type="button" className={styles["logout"]} onClick={logout}>
            <LogOut size={16} strokeWidth={1.8} />
            Se déconnecter
          </button>
        </div>
      )}

      {user === null && !unavailable && linkStatus !== "sent" && (
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
            disabled={linkStatus === "sending" || linkStatus === "completing"}
          >
            {linkStatus === "sending" ? "Envoi…" : "Recevoir mon lien"}
          </button>
        </form>
      )}

      {linkStatus === "sent" && (
        <div className={styles["success"]}>
          <MailCheck size={18} strokeWidth={1.8} />
          <span>
            Un lien de connexion vient d&rsquo;être envoyé à {email}. Ouvre-le
            depuis cet appareil pour te connecter.
          </span>
        </div>
      )}

      {linkStatus === "error" && errorMessage && (
        <p className={styles["error"]}>{errorMessage}</p>
      )}

      {unavailable && (
        <p className={styles["error"]}>
          La connexion par email n&rsquo;est pas encore activée sur ce
          déploiement.
        </p>
      )}
    </main>
  );
}
