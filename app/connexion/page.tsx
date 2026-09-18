"use client";

import { useState } from "react";
import { UserRound, BellRing } from "lucide-react";
import styles from "./page.module.css";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
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
      <h1>Les comptes arrivent bientôt</h1>
      <p className={styles["sub"]}>
        Aujourd&rsquo;hui, le service fonctionne sans compte : chaque
        recherche est traitée à la volée, sans historique lié à une
        identité. Un espace compte (historique de recherches, favoris,
        alertes) est prévu pour la suite.
      </p>

      {status === "done" ? (
        <div className={styles["success"]}>
          <BellRing size={18} strokeWidth={1.8} />
          <span>C&rsquo;est noté, on te préviendra à cette adresse.</span>
        </div>
      ) : (
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <input
            type="email"
            required
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles["input"]}
          />
          <button type="submit" className={styles["submit"]} disabled={status === "loading"}>
            {status === "loading" ? "Envoi…" : "Être averti au lancement"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className={styles["error"]}>Une erreur est survenue, réessaie.</p>
      )}
    </main>
  );
}
