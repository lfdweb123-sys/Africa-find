"use client";

import { useEffect, useRef, useState } from "react";
import { NICHE_CATEGORIES } from "@/lib/agents/niches";

interface SearchResult {
  status: "hors_perimetre" | "besoin_precision" | "ok";
  message: string;
  niche?: string;
  nbResultats?: number;
}

interface Props {
  placeholder?: string;
  showSuggestions?: boolean;
}

export default function SearchExperience({
  placeholder = "Ex: un développeur Next.js freelance, un routeur wifi maillé...",
  showSuggestions = true,
}: Props) {
  const [text, setText] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setImagePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  async function runSearch(queryText: string) {
    setLoading(true);
    setError(null);
    setResult(null);

    const [ville, ...rest] = location.split(",").map((s) => s.trim());
    const pays = rest.length ? rest[rest.length - 1] : location.trim() || undefined;
    const villeFinal = rest.length ? ville : undefined;

    const form = new FormData();
    form.set("text", queryText);
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    runSearch(text);
  }

  function handleSuggestion(label: string) {
    setText(label);
    runSearch(label);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setImageFile(e.target.files?.[0] ?? null);
  }

  return (
    <div className="experience">
      <form className="searchbar" onSubmit={handleSubmit}>
        <div className="row">
          <div className="field-wrap field-main">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              className="field"
              type="text"
              placeholder={placeholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="field-wrap field-loc">
            <svg className="icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21s-7-6.1-7-11a7 7 0 1 1 14 0c0 4.9-7 11-7 11z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
            </svg>
            <input
              className="field"
              type="text"
              placeholder="Ville, pays (ex: Cotonou, Bénin)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        <div className="row row-actions">
          {imagePreviewUrl ? (
            <div className="thumb-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreviewUrl} alt="Aperçu de la photo jointe" className="thumb" />
              <div className="thumb-meta">
                <span className="thumb-name">{imageFile?.name}</span>
                <button
                  type="button"
                  className="thumb-remove"
                  onClick={() => {
                    setImageFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                >
                  Retirer
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="attach"
              onClick={() => fileInputRef.current?.click()}
            >
              Joindre une photo
            </button>
          )}
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

      {showSuggestions && (
        <div className="suggestions">
          <span className="suggestions-label">Suggestions :</span>
          {NICHE_CATEGORIES.slice(0, 5).map((c) => (
            <button
              key={c.slug}
              type="button"
              className="chip"
              onClick={() => handleSuggestion(c.label)}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

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
      </section>

      <style jsx>{`
        .experience {
          max-width: 720px;
          margin: 0 auto;
        }

        .searchbar {
          background: var(--paper-raised);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 10px;
          box-shadow: 0 1px 2px rgba(16, 24, 43, 0.04);
        }

        .row {
          display: flex;
          gap: 8px;
        }

        .row + .row {
          margin-top: 8px;
          padding-top: 10px;
          border-top: 1px solid var(--line);
        }

        .row-actions {
          justify-content: space-between;
          align-items: center;
          padding-left: 6px;
          padding-right: 6px;
        }

        .field-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 12px;
          border-radius: 7px;
        }

        .field-wrap:hover {
          background: var(--paper);
        }

        .field-main {
          flex: 1;
        }

        .field-loc {
          width: 260px;
          border-left: 1px solid var(--line);
        }

        .icon {
          color: var(--ink-soft);
          flex-shrink: 0;
        }

        .field {
          border: none;
          outline: none;
          background: transparent;
          font-size: 0.96rem;
          font-family: var(--font-body);
          color: var(--ink);
          width: 100%;
        }

        .field::placeholder {
          color: #8b93a7;
        }

        .attach {
          background: none;
          border: none;
          color: var(--ink-soft);
          font-size: 0.85rem;
          cursor: pointer;
          padding: 6px 4px;
        }

        .attach:hover {
          color: var(--ink);
        }

        .thumb-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
        }

        .thumb {
          width: 40px;
          height: 40px;
          object-fit: cover;
          border-radius: 6px;
          border: 1px solid var(--line);
          flex-shrink: 0;
        }

        .thumb-meta {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .thumb-name {
          font-size: 0.82rem;
          color: var(--ink);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
        }

        .thumb-remove {
          background: none;
          border: none;
          color: #a3312a;
          font-size: 0.78rem;
          cursor: pointer;
          padding: 0;
          text-align: left;
        }

        .thumb-remove:hover {
          text-decoration: underline;
        }

        .submit {
          background: var(--ink);
          color: var(--paper);
          border: none;
          border-radius: 7px;
          padding: 11px 24px;
          font-size: 0.95rem;
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

        .suggestions {
          margin-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          justify-content: center;
        }

        .suggestions-label {
          font-size: 0.85rem;
          color: var(--ink-soft);
          margin-right: 4px;
        }

        .chip {
          background: var(--paper-raised);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 6px 14px;
          font-size: 0.83rem;
          color: var(--ink-soft);
          cursor: pointer;
        }

        .chip:hover {
          border-color: var(--teal);
          color: var(--ink);
        }

        .results {
          margin-top: 24px;
        }

        .error {
          color: #a3312a;
          font-weight: 500;
          text-align: center;
        }

        .panel {
          border-left: 3px solid var(--teal);
          background: var(--paper-raised);
          padding: 20px 22px;
          border-radius: 0 8px 8px 0;
          text-align: left;
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
            border-left: none;
            border-top: 1px solid var(--line);
          }
        }
      `}</style>
    </div>
  );
}
