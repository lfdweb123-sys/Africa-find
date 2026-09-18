"use client";

import { useEffect, useState } from "react";
import StatusWave from "@/components/StatusWave";
import styles from "./page.module.css";

type ServiceStatus = "operational" | "configured" | "degraded" | "down";

interface ServiceHealth {
  id: string;
  label: string;
  description: string;
  status: ServiceStatus;
  checkedLive: boolean;
  latencyMs?: number;
}

interface HealthResponse {
  checkedAt: string;
  services: ServiceHealth[];
}

const STATUS_LABEL: Record<ServiceStatus, string> = {
  operational: "En ligne",
  configured: "Configuré",
  degraded: "Dégradé",
  down: "Indisponible",
};

function toneFor(status: ServiceStatus): "teal" | "gold" | "down" {
  if (status === "operational") return "teal";
  if (status === "configured" || status === "degraded") return "gold";
  return "down";
}

export default function StatusPage() {
  const [data, setData] = useState<HealthResponse | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/health", { cache: "no-store" });
      if (!res.ok) throw new Error("failed");
      const json = await res.json();
      setData(json);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className={styles["page"]}>
      <p className={styles["kicker"]}>
        <span className={styles["dot"]} />
        Statut des fonctions live
      </p>
      <h1>État du système en temps réel</h1>
      <p className={styles["sub"]}>
        Vérification réelle toutes les 30 secondes — le moteur de recherche
        et le webhook WhatsApp sont vérifiés par la présence de leur
        configuration, la journalisation Firestore par une lecture réelle.
      </p>

      {loading && !data && <p className={styles["loading"]}>Vérification en cours…</p>}
      {error && (
        <p className={styles["error"]}>
          Impossible de vérifier l&rsquo;état des services pour le moment.
        </p>
      )}

      {data && (
        <>
          <div className={styles["list"]}>
            {data.services.map((s) => (
              <div key={s.id} className={styles["row"]}>
                <div className={styles["row-info"]}>
                  <div className={styles["row-heading"]}>
                    <span className={`${styles["led"]} ${styles[toneFor(s.status)]}`} />
                    <span className={styles["label"]}>{s.label}</span>
                    <span className={`${styles["badge"]} ${styles[toneFor(s.status)]}`}>
                      {STATUS_LABEL[s.status]}
                    </span>
                  </div>
                  <p className={styles["desc"]}>{s.description}</p>
                  <p className={styles["meta"]}>
                    {s.checkedLive
                      ? `Vérifié en direct${
                          s.latencyMs !== undefined ? ` · ${s.latencyMs} ms` : ""
                        }`
                      : "Vérifié par configuration (pas d'appel réel)"}
                  </p>
                </div>
                <StatusWave
                  active={s.status === "operational" || s.status === "configured"}
                  tone={toneFor(s.status)}
                />
              </div>
            ))}
          </div>

          <p className={styles["timestamp"]}>
            Dernière vérification : {new Date(data.checkedAt).toLocaleTimeString("fr-FR")}
          </p>
        </>
      )}
    </main>
  );
}
