import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";

export const dynamic = "force-dynamic";

type ServiceStatus = "operational" | "configured" | "degraded" | "down";

interface ServiceHealth {
  id: string;
  label: string;
  description: string;
  status: ServiceStatus;
  checkedLive: boolean;
  latencyMs?: number;
}

async function checkFirestore(): Promise<ServiceHealth> {
  const start = Date.now();
  try {
    const db = getDb();
    await db.collection("stats_niches").limit(1).get();
    return {
      id: "firestore",
      label: "Journalisation des recherches",
      description: "Enregistrement des métadonnées de chaque recherche.",
      status: "operational",
      checkedLive: true,
      latencyMs: Date.now() - start,
    };
  } catch {
    return {
      id: "firestore",
      label: "Journalisation des recherches",
      description: "Enregistrement des métadonnées de chaque recherche.",
      status: "down",
      checkedLive: true,
      latencyMs: Date.now() - start,
    };
  }
}

function checkAnthropic(): ServiceHealth {
  const configured = Boolean(process.env.ANTHROPIC_API_KEY);
  return {
    id: "anthropic",
    label: "Moteur de recherche",
    description: "Recherche web, extraction et formatage des résultats.",
    status: configured ? "configured" : "down",
    checkedLive: false,
  };
}

function checkWhatsApp(): ServiceHealth {
  const configured = Boolean(
    process.env.WHATSAPP_TOKEN &&
      process.env.WHATSAPP_PHONE_NUMBER_ID &&
      process.env.WHATSAPP_VERIFY_TOKEN
  );
  return {
    id: "whatsapp",
    label: "Messagerie WhatsApp",
    description: "Réception et envoi de messages sur WhatsApp.",
    status: configured ? "configured" : "down",
    checkedLive: false,
  };
}

export async function GET() {
  const [firestore, anthropic, whatsapp] = await Promise.all([
    checkFirestore(),
    Promise.resolve(checkAnthropic()),
    Promise.resolve(checkWhatsApp()),
  ]);

  return NextResponse.json({
    checkedAt: new Date().toISOString(),
    services: [anthropic, firestore, whatsapp],
  });
}
