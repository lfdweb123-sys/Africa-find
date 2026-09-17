# Africa Find

Moteur de recherche IA multi-agents pour le commerce et les services numériques africains, exposé via WhatsApp.

## Périmètre

Informatique, numérique et Internet uniquement : matériel informatique, téléphones et accessoires, logiciels et SaaS, services web, hébergement et domaines, outils IA, formations en informatique/numérique, prestations de développeurs, graphistes et freelances du numérique, APIs et services pour développeurs.

## Architecture

- `app/api/webhook/route.ts` — webhook WhatsApp Cloud API (vérification + réception des messages)
- `lib/agents/orchestrator.ts` — point d'entrée qui enchaîne : image → recherche texte → extraction structurée → formatage → logging
- `lib/agents/searchImage.ts` — reconnaissance visuelle (si l'utilisateur envoie une photo)
- `lib/agents/searchText.ts` — recherche web ciblée (utilise l'outil `web_search` de l'API Claude)
- `lib/agents/nicheFilter.ts` — validateur de périmètre indépendant (disponible, non appelé dans le pipeline par défaut — voir note ci-dessous)
- `lib/agents/extract.ts` — conversion des résultats bruts en JSON structuré, exclut déjà tout résultat hors niche
- `lib/agents/formatResponse.ts` — message final WhatsApp
- `lib/agents/logging.ts` — écriture des métadonnées de requête dans Firestore (jamais les résultats commerciaux)

**Note d'implémentation** : le filtre de niche (`nicheFilter.ts`) est fourni prêt à l'emploi mais n'est pas appelé automatiquement dans `orchestrator.ts`, car l'agent d'extraction structurée exclut déjà tout résultat dont la niche ne correspond à aucune valeur autorisée. Si tu veux une double validation stricte, appelle `checkNiche()` sur chaque résultat avant l'extraction.

## Variables d'environnement

Copie `.env.example` vers `.env.local` en développement, et configure les mêmes clés dans Vercel (Project Settings → Environment Variables) :

- `ANTHROPIC_API_KEY`
- `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`, `WHATSAPP_VERIFY_TOKEN`
- `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`

`FIREBASE_PRIVATE_KEY` : colle la clé telle quelle depuis le JSON de la clé de service, avec les `\n` littéraux — le code les convertit automatiquement en vrais retours à la ligne.

## Déploiement sur Vercel

1. Pousse ce dossier dans un repo GitHub.
2. Sur [vercel.com](https://vercel.com), "Add New Project" → importe le repo.
3. Framework détecté automatiquement : Next.js. Aucune config build à changer.
4. Ajoute les variables d'environnement listées ci-dessus dans l'onglet Environment Variables (Production + Preview).
5. Déploie. L'URL du webhook à donner à Meta sera : `https://<ton-projet>.vercel.app/api/webhook`.

## Configuration du webhook WhatsApp (Meta for Developers)

1. Dans ton app Meta for Developers → WhatsApp → Configuration.
2. Callback URL : `https://<ton-projet>.vercel.app/api/webhook`
3. Verify Token : la même valeur que `WHATSAPP_VERIFY_TOKEN`.
4. Abonne le champ `messages`.

## Installation locale

```bash
npm install
cp .env.example .env.local   # puis remplis les valeurs
npm run dev
```

Le webhook ne recevra pas de requêtes réelles en local sans exposer le port (ex: `ngrok http 3000`) et configurer cette URL temporaire dans Meta for Developers.

## Limites connues / à surveiller

- La détection pays/ville dans `route.ts` (`extractLocationHint`) est volontairement minimale (regex simple). Pour un vrai suivi conversationnel multi-tours (ex: l'utilisateur donne la ville dans un message séparé), il faut ajouter un état de conversation par numéro (Firestore `users/{userId}/session`).
- Chaque requête WhatsApp déclenche plusieurs appels séquentiels à l'API Claude (image éventuelle → recherche web → extraction → formatage), ce qui peut prendre plusieurs secondes. À surveiller en prod.
- Le module Firebase Admin nécessite `serverComponentsExternalPackages` dans `next.config.js` (déjà configuré) pour fonctionner correctement sur Vercel.
