"use client";

import { useRef, useState } from "react";

interface SearchResult {
  status: "hors_perimetre" | "besoin_precision" | "ok";
  message: string;
  niche?: string;
  nbResultats?: number;
}

export default function Home() {
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const [ville, ...rest] = location.split(",").map((s) => s.trim());
    const pays = rest.length ? rest[rest.length - 1] : location.trim() || undefined;
    const villeFinal = rest.length ? ville : undefined;

    const form = new FormData();
    form.set("text", text);
    if (pays) form.set("pays", pays);
    if (villeFinal) form.set("ville", villeFinal);
    if (imageFile) form.set("image", imageFile);

    try {
      const res = await fetch("/api/search", { method: "POST", body: form });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }

      setResult(data);
    } catch {
      setError("Impossible de joindre le serveur. Réessaie.");
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImageFile(e.target.files?.[0] ?? null);
  }

  return (
    <main className="wrap">
      <section className="hero">
        <p className="kicker">Recherche · numérique africain</p>
        <h1>
          Trouve ce qu&rsquo;il te faut,
          <br />
          dans le numérique africain.
        </h1>
        <p className="sub">
          Matériel informatique, téléphones, logiciels, hébergement,
          formations, freelances, APIs — décris ce que tu cherches, avec le
          pays et la ville, et on va voir ce qui existe vraiment.
        </p>
      </section>

      <form className="searchbar" onSubmit={handleSubmit}>
        <div className="row">
          <input
            className="field field-main"
            type="text"
            placeholder="Ex: un développeur Next.js freelance, un routeur wifi..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            className="field field-loc"
            type="text"
            placeholder="Ville, pays"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="row row-actions">
          <button
            type="button"
            className="attach"
            onClick={() => fileInputRef.current?.click()}
          >
            {imageFile ? `Photo : ${imageFile.name}` : "Joindre une photo"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
          <button type="submit" className="submit" disabled={loading}>
            {loading ? "Recherche en cours…" : "Chercher"}
          </button>
        </div>
      </form>

      <section className="results" aria-live="polite">
        {error && <p className="error">{error}</p>}

        {result && (
          <div className={`panel panel-${result.status}`}>
            {result.niche && (
              <p className="panel-meta">
                {result.niche}
                {typeof result.nbResultats === "number" &&
                  ` · ${result.nbResultats} résultat${
                    result.nbResultats > 1 ? "s" : ""
                  }`}
              </p>
            )}
            <p className="panel-message">{result.message}</p>
          </div>
        )}

        {!result && !error && !loading && (
          <p className="empty">
            Une recherche à la fois — les résultats s&rsquo;affichent ici.
          </p>
        )}
      </section>

      <style jsx>{`
        .wrap {
          max-width: 760px;
          margin: 0 auto;
          padding: 96px 24px 120px;
        }

        .kicker {
          margin: 0 0 16px;
          color: var(--teal);
          font-weight: 600;
          font-size: 0.9rem;
        }

        h1 {
          font-size: clamp(2.1rem, 5vw, 3.1rem);
          font-weight: 700;
          line-height: 1.08;
        }

        .sub {
          margin-top: 20px;
          max-width: 58ch;
          color: var(--ink-soft);
          font-size: 1.05rem;
        }

        .searchbar {
          margin-top: 48px;
          background: var(--paper-raised);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 18px;
        }

        .row {
          display: flex;
          gap: 12px;
        }

        .row + .row {
          margin-top: 12px;
        }

        .row-actions {
          justify-content: space-between;
          align-items: center;
        }

        .field {
          border: 1px solid var(--line);
          border-radius: var(--radius);
          padding: 12px 14px;
          font-size: 1rem;
          font-family: var(--font-body), system-ui, sans-serif;
          color: var(--ink);
          background: var(--paper);
        }

        .field-main {
          flex: 1;
        }

        .field-loc {
          width: 220px;
        }

        .attach {
          background: none;
          border: none;
          color: var(--ink-soft);
          font-size: 0.9rem;
          cursor: pointer;
          padding: 8px 4px;
        }

        .attach:hover {
          color: var(--ink);
        }

        .submit {
          background: var(--ink);
          color: var(--paper);
          border: none;
          border-radius: var(--radius);
          padding: 12px 28px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
        }

        .submit:disabled {
          opacity: 0.6;
          cursor: default;
        }

        .submit:not(:disabled):hover {
          background: var(--teal);
        }

        .results {
          margin-top: 32px;
        }

        .empty {
          color: var(--ink-soft);
          font-size: 0.95rem;
        }

        .error {
          color: #a3312a;
          font-weight: 500;
        }

        .panel {
          border-left: 3px solid var(--teal);
          background: var(--paper-raised);
          padding: 20px 22px;
          border-radius: 0 var(--radius) var(--radius) 0;
        }

        .panel-besoin_precision {
          border-left-color: var(--gold);
        }

        .panel-hors_perimetre {
          border-left-color: var(--ink-soft);
        }

        .panel-meta {
          margin: 0 0 8px;
          font-size: 0.82rem;
          color: var(--ink-soft);
          text-transform: capitalize;
        }

        .panel-message {
          margin: 0;
          white-space: pre-wrap;
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .row {
            flex-direction: column;
          }
          .field-loc {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
}
