import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/firebase";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide." }, { status: 400 });
    }

    const db = getDb();
    await db.collection("waitlist").add({
      email: email.trim().toLowerCase(),
      date: FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Erreur /api/waitlist:", err);
    return NextResponse.json(
      { error: "Une erreur est survenue. Réessaie." },
      { status: 500 }
    );
  }
}
