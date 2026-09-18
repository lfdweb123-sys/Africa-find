import { NextRequest, NextResponse } from "next/server";
import { runOrchestrator } from "@/lib/agents/orchestrator";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const text = (form.get("text") as string | null)?.trim() ?? "";
    const pays = (form.get("pays") as string | null)?.trim() || undefined;
    const ville = (form.get("ville") as string | null)?.trim() || undefined;
    const imageFile = form.get("image") as File | null;

    if (!text && !imageFile) {
      return NextResponse.json(
        { error: "Décris ce que tu cherches, ou envoie une photo." },
        { status: 400 }
      );
    }

    let imageBase64: string | undefined;
    let imageMediaType: string | undefined;

    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      imageBase64 = Buffer.from(arrayBuffer).toString("base64");
      imageMediaType = imageFile.type || "image/jpeg";
    }

    const result = await runOrchestrator(
      { userText: text || undefined, imageBase64, imageMediaType, pays, ville },
      null
    );

    return NextResponse.json(result);
  } catch (err) {
    console.error("Erreur /api/search:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue pendant la recherche. Réessaie." },
      { status: 500 }
    );
  }
}
