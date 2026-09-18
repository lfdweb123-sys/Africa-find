"use client";

import { useState } from "react";
import { Store, Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { NICHE_CATEGORIES } from "@/lib/agents/niches";
import { SITE_CONFIG, whatsAppLink } from "@/lib/site-config";
import styles from "./page.module.css";

export default function PublierPage() {
  const [form, setForm] = useState({
    activite: "",
    categorie: NICHE_CATEGORIES[0].slug,
    ville: "",
    contact: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className={styles["page"]}>
      <section className={styles["hero"]}>
        <span className={styles["icon"]}>
          <Store size={26} strokeWidth={1.7} />
        </span>
        <p className={styles["kicker"]}>
          <span className={styles["dot"]} />
          Fournisseurs & prestataires
        </p>
        <h1>Référencer votre activité</h1>
        <p className={styles["sub"]}>
          Il n&rsquo;y a pas encore de catalogue payant ni de fiche
          automatique : le moteur explore le web ouvert à chaque recherche.
          Si votre activité est déjà visible en ligne (site, page
          professionnelle, annonce sur une marketplace locale), elle peut
          déjà remonter dans les résultats. Le formulaire ci-dessous nous
          permet de la connaître et de l&rsquo;examiner en attendant un vrai
          système de référencement vérifié.
        </p>
      </section>

      {status === "done" ? (
        <div className={styles["success"]}>
          <CheckCircle2 size={20} strokeWidth={1.8} />
          <span>
            Merci, votre activité a bien été transmise — on revient vers
            vous si besoin.
          </span>
        </div>
      ) : (
        <form className={styles["form"]} onSubmit={handleSubmit}>
          <div className={styles["field"]}>
            <label htmlFor="activite">Nom de l&rsquo;activité *</label>
            <input
              id="activite"
              required
              value={form.activite}
              onChange={(e) => update("activite", e.target.value)}
              placeholder="Ex: TechRepair Cotonou"
            />
          </div>

          <div className={styles["row"]}>
            <div className={styles["field"]}>
              <label htmlFor="categorie">Catégorie *</label>
              <select
                id="categorie"
                value={form.categorie}
                onChange={(e) => update("categorie", e.target.value)}
              >
                {NICHE_CATEGORIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles["field"]}>
              <label htmlFor="ville">Ville, pays *</label>
              <input
                id="ville"
                required
                value={form.ville}
                onChange={(e) => update("ville", e.target.value)}
                placeholder="Cotonou, Bénin"
              />
            </div>
          </div>

          <div className={styles["field"]}>
            <label htmlFor="contact">Téléphone ou WhatsApp *</label>
            <input
              id="contact"
              required
              value={form.contact}
              onChange={(e) => update("contact", e.target.value)}
              placeholder="+229 ..."
            />
          </div>

          <div className={styles["field"]}>
            <label htmlFor="description">Description courte</label>
            <textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              placeholder="Ce que vous proposez, en quelques mots"
            />
          </div>

          <button type="submit" className={styles["submit"]} disabled={status === "loading"}>
            {status === "loading" ? "Envoi…" : "Soumettre mon activité"}
          </button>
          {status === "error" && (
            <p className={styles["error"]}>Une erreur est survenue, réessaie.</p>
          )}
        </form>
      )}

      <div className={styles["contactBox"]}>
        <p className={styles["contactLabel"]}>Ou contactez-nous directement</p>
        <div className={styles["contactLinks"]}>
          <a
            href={whatsAppLink("Bonjour, je souhaite référencer mon activité sur Africa Find.")}
            target="_blank"
            rel="noopener noreferrer"
            className={styles["contactLink"]}
          >
            <MessageCircle size={18} strokeWidth={1.8} />
            {SITE_CONFIG.supportWhatsAppDisplay}
          </a>
          <a href={`mailto:${SITE_CONFIG.supportEmail}`} className={styles["contactLink"]}>
            <Mail size={18} strokeWidth={1.8} />
            {SITE_CONFIG.supportEmail}
          </a>
        </div>
      </div>
    </main>
  );
}
