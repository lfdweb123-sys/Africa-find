const GRAPH_API_VERSION = "v21.0";

interface WhatsAppIncomingMessage {
  from: string; // numéro de l'expéditeur (format WhatsApp)
  type: "text" | "image" | "other";
  text?: string;
  imageId?: string; // media id WhatsApp, à télécharger séparément
  caption?: string;
}

/**
 * Parse le corps brut d'un webhook WhatsApp Cloud API et retourne
 * le premier message entrant, ou null s'il n'y en a pas
 * (ex: notification de statut de livraison).
 */
export function parseIncomingWebhook(
  body: any
): WhatsAppIncomingMessage | null {
  try {
    const entry = body?.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;
    const message = value?.messages?.[0];

    if (!message) return null;

    const from = message.from;

    if (message.type === "text") {
      return { from, type: "text", text: message.text?.body ?? "" };
    }

    if (message.type === "image") {
      return {
        from,
        type: "image",
        imageId: message.image?.id,
        caption: message.image?.caption ?? "",
      };
    }

    return { from, type: "other" };
  } catch (err) {
    console.error("Erreur de parsing du webhook WhatsApp:", err);
    return null;
  }
}

/**
 * Télécharge un média WhatsApp (image) par son ID et retourne
 * les données en base64 avec le media_type.
 */
export async function downloadWhatsAppMedia(
  mediaId: string
): Promise<{ base64: string; mediaType: string } | null> {
  const token = process.env.WHATSAPP_TOKEN;
  if (!token) throw new Error("WHATSAPP_TOKEN manquant.");

  const metaRes = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${mediaId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!metaRes.ok) {
    console.error("Échec récupération métadonnées média:", await metaRes.text());
    return null;
  }
  const meta = await metaRes.json();

  const fileRes = await fetch(meta.url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!fileRes.ok) {
    console.error("Échec téléchargement média:", await fileRes.text());
    return null;
  }

  const arrayBuffer = await fileRes.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");

  return { base64, mediaType: meta.mime_type ?? "image/jpeg" };
}

/**
 * Envoie un message texte à un numéro WhatsApp via la Cloud API.
 */
export async function sendWhatsAppText(
  to: string,
  text: string
): Promise<void> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    throw new Error(
      "WHATSAPP_TOKEN ou WHATSAPP_PHONE_NUMBER_ID manquant."
    );
  }

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body: text },
      }),
    }
  );

  if (!res.ok) {
    console.error("Échec envoi message WhatsApp:", await res.text());
  }
}
