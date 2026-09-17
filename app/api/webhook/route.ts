import { NextRequest, NextResponse } from "next/server";
import {
  parseIncomingWebhook,
  downloadWhatsAppMedia,
  sendWhatsAppText,
} from "@/lib/whatsapp";
import { runOrchestrator } from "@/lib/agents/orchestrator";

/**
 * Vérification du webhook par Meta (WhatsApp Cloud API) lors de la
 * configuration dans le dashboard Meta for Developers.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    return new NextResponse(challenge ?? "", { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

/**
 * Réception des messages entrants WhatsApp. Répond immédiatement 200
 * à Meta (obligatoire, sous peine de retries), puis traite le message
 * de manière asynchrone et envoie la réponse via l'API d'envoi.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();

  const message = parseIncomingWebhook(body);

  if (!message) {
    // Notification de statut ou événement sans message utilisateur.
    return NextResponse.json({ ok: true });
  }

  // On traite la requête sans bloquer la réponse au webhook.
  handleIncomingMessage(message).catch((err) => {
    console.error("Erreur de traitement du message WhatsApp:", err);
  });

  return NextResponse.json({ ok: true });
}

async function handleIncomingMessage(message: {
  from: string;
  type: "text" | "image" | "other";
  text?: string;
  imageId?: string;
  caption?: string;
}) {
  const { from } = message;

  try {
    if (message.type === "other") {
      await sendWhatsAppText(
        from,
        "Je ne peux traiter que du texte ou une image de produit pour l'instant."
      );
      return;
    }

    const { pays, ville, text: cleanedText } = extractLocationHint(
      message.text ?? message.caption ?? ""
    );

    let imageBase64: string | undefined;
    let imageMediaType: string | undefined;

    if (message.type === "image" && message.imageId) {
      const media = await downloadWhatsAppMedia(message.imageId);
      if (media) {
        imageBase64 = media.base64;
        imageMediaType = media.mediaType;
      }
    }

    const result = await runOrchestrator(
      {
        userText: cleanedText,
        imageBase64,
        imageMediaType,
        pays,
        ville,
      },
      from
    );

    await sendWhatsAppText(from, result.message);
  } catch (err) {
    console.error("Erreur pipeline Africa Find:", err);
    await sendWhatsAppText(
      from,
      "Désolé, une erreur est survenue pendant la recherche. Réessaie dans un instant."
    );
  }
}

/**
 * Extraction très simple pays/ville à partir du texte utilisateur.
 * Reconnaît un pattern "à <ville>, <pays>" ou "<ville>, <pays>".
 * Volontairement minimal : à remplacer par un vrai state machine
 * de conversation par utilisateur si besoin d'un suivi multi-tours.
 */
function extractLocationHint(text: string): {
  pays?: string;
  ville?: string;
  text: string;
} {
  const match = text.match(/(?:à|a)\s+([\wÀ-ÿ\s]+),\s*([\wÀ-ÿ\s]+)$/i);
  if (match) {
    const cleaned = text.replace(match[0], "").trim();
    return { ville: match[1].trim(), pays: match[2].trim(), text: cleaned };
  }
  return { text };
}
