import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

let cachedAuth: Auth | null | undefined;

/**
 * Initialise le SDK client Firebase à la demande (jamais au chargement du
 * module, pour ne pas casser le rendu si les variables publiques ne sont
 * pas encore configurées). Retourne null si la configuration est absente
 * ou invalide — les appelants doivent gérer ce cas proprement.
 */
export function getClientAuth(): Auth | null {
  if (cachedAuth !== undefined) return cachedAuth;

  const config: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  if (!config.apiKey || !config.authDomain || !config.projectId || !config.appId) {
    cachedAuth = null;
    return null;
  }

  try {
    const app = getApps().length ? getApp() : initializeApp(config);
    cachedAuth = getAuth(app);
  } catch (err) {
    console.error("Erreur d'initialisation Firebase (client):", err);
    cachedAuth = null;
  }

  return cachedAuth;
}
