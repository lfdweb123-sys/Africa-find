import { getDb } from "../firebase";
import { FieldValue } from "firebase-admin/firestore";

export interface RequeteLog {
  userId: string | null;
  type: "texte" | "image";
  contenu_requete: string;
  niche_detectee: string | null;
  pays_cible: string | null;
  ville_cible: string | null;
  nb_resultats_trouves: number;
}

/**
 * Écrit une entrée de requête dans Firestore et incrémente les
 * compteurs agrégés de stats_niches. N'écrit jamais les résultats
 * commerciaux eux-mêmes (vendeurs/prix/contacts) — uniquement les
 * métadonnées, conformément au design du système.
 */
export async function logRequete(entry: RequeteLog): Promise<void> {
  const db = getDb();

  const requeteDoc = {
    userId: entry.userId,
    type: entry.type,
    contenu_requete: entry.contenu_requete,
    niche_detectee: entry.niche_detectee,
    pays_cible: entry.pays_cible,
    ville_cible: entry.ville_cible,
    nb_resultats_trouves: entry.nb_resultats_trouves,
    date: FieldValue.serverTimestamp(),
  };

  await db.collection("requetes").add(requeteDoc);

  if (entry.niche_detectee) {
    const statsRef = db.collection("stats_niches").doc(entry.niche_detectee);
    await statsRef.set(
      {
        niche: entry.niche_detectee,
        nb_requetes_total: FieldValue.increment(1),
        nb_requetes_sans_resultat: FieldValue.increment(
          entry.nb_resultats_trouves === 0 ? 1 : 0
        ),
      },
      { merge: true }
    );
  }
}
