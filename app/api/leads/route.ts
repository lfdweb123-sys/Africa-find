import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";
import { getCategoryBySlug } from "@/lib/agents/niches";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { activite, categorie, ville, contact, description } = body;

    if (!activite || !categorie || !ville || !contact) {
      return NextResponse.json(
        { error: "Merci de remplir tous les champs obligatoires." },
        { status: 400 }
      );
    }

    const category = getCategoryBySlug(categorie);

    const db = getDb();
    await db.collection("prestataires_soumissions").add({
      activite: String(activite).trim(),
      categorie: category?.label ?? String(categorie),
      ville: String(ville).trim(),
      contact: String(contact).trim(),
      description: description ? String(description).trim() : null,
      statut: "en_attente",
      date: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erreur /api/leads:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessaie." },
      { status: 500 }
    );
  }
}
