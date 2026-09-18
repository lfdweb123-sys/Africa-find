"use client";

import { useCallback, useEffect, useState } from "react";
import {
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { getClientAuth } from "@/lib/firebaseClient";

const STORAGE_KEY = "africafind_email_for_signin";

export type LinkStatus = "idle" | "sending" | "sent" | "completing" | "error";

export function useEmailLinkAuth(redirectPath: string) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [linkStatus, setLinkStatus] = useState<LinkStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) {
      setUser(null);
      setUnavailable(true);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  useEffect(() => {
    const auth = getClientAuth();
    if (!auth) return;
    if (!isSignInWithEmailLink(auth, window.location.href)) return;

    let email = window.localStorage.getItem(STORAGE_KEY);
    if (!email) {
      email = window.prompt("Confirme ton adresse email pour terminer la connexion :");
    }
    if (!email) return;

    setLinkStatus("completing");
    signInWithEmailLink(auth, email, window.location.href)
      .then(() => {
        window.localStorage.removeItem(STORAGE_KEY);
        setLinkStatus("idle");
        window.history.replaceState({}, document.title, redirectPath);
      })
      .catch((err) => {
        console.error("Erreur de finalisation du lien de connexion:", err);
        setErrorMessage("Ce lien est invalide ou a expiré. Redemande-en un.");
        setLinkStatus("error");
      });
  }, [redirectPath]);

  const sendLink = useCallback(
    async (email: string) => {
      const auth = getClientAuth();
      if (!auth) {
        setErrorMessage("Service indisponible pour le moment.");
        setLinkStatus("error");
        return;
      }
      setLinkStatus("sending");
      setErrorMessage(null);
      try {
        await sendSignInLinkToEmail(auth, email, {
          url: `${window.location.origin}${redirectPath}`,
          handleCodeInApp: true,
        });
        window.localStorage.setItem(STORAGE_KEY, email);
        setLinkStatus("sent");
      } catch (err) {
        console.error("Erreur d'envoi du lien de connexion:", err);
        setErrorMessage("Adresse invalide ou envoi impossible. Réessaie.");
        setLinkStatus("error");
      }
    },
    [redirectPath]
  );

  const logout = useCallback(async () => {
    const auth = getClientAuth();
    if (!auth) return;
    await firebaseSignOut(auth);
  }, []);

  return { user, linkStatus, errorMessage, unavailable, sendLink, logout };
}
