# TAALIM DZ — prêt pour GitHub Pages

Site éducatif statique, en arabe (RTL), sans base de données, sans compte et sans frais de serveur nécessaires. Il peut être publié publiquement avec GitHub Pages.

## Fonctionnalités
- Interface responsive pour téléphone, tablette et ordinateur.
- Bibliothèque de ressources filtrable (niveau, matière, type et recherche).
- Cours et PDF d'entraînement avec corrigés.
- Quiz avec correction immédiate et historique local des scores.
- Planificateur de révision avec tâches cochables/supprimables.
- Export manuel des progrès en JSON et impression.
- Mode sombre.
- PWA de base : manifeste et cache hors ligne pour les fichiers inclus.
- Pas de collecte de compte, de mot de passe ni de code d'accès.

## Publier sur GitHub Pages
1. Crée un compte sur https://github.com si nécessaire.
2. Crée un nouveau dépôt public, par exemple `taalim-dz`.
3. Décompresse cette archive et téléverse **tous les fichiers et dossiers à la racine du dépôt** (`index.html`, `app.js`, `resources.json`, `manifest.webmanifest`, `sw.js`, `icon.svg`, `pdf/`).
4. Dans le dépôt, ouvre **Settings → Pages**.
5. Dans **Build and deployment**, choisis **Deploy from a branch**.
6. Choisis la branche `main` et le dossier `/(root)`, puis clique **Save**.
7. Attends le déploiement indiqué dans l'onglet Actions ou Settings → Pages. L'adresse sera du type `https://TON-NOM.github.io/taalim-dz/`.
8. Ouvre l'adresse HTTPS et teste les filtres, PDF, quiz et planificateur.

Si tu utilises un dépôt `TON-NOM.github.io`, l'adresse sera `https://TON-NOM.github.io/`.

## Ajouter un cours ou un examen
1. Ajoute le fichier PDF au dossier `pdf/`.
2. Ouvre `resources.json` et ajoute un objet dans le tableau, par exemple :
   {
     "id": "exam-francais-1am",
     "title": "Examen de français — 1AM",
     "stage": "متوسط",
     "subject": "Français",
     "type": "examen",
     "desc": "Sujet d'entraînement et corrigé.",
     "file": "pdf/exam-francais-1am.pdf",
     "label": "Sujet + corrigé"
   }
3. Si tu ajoutes une matière, ajoute-la aussi dans la liste du filtre `subjectFilter` dans `index.html`.
4. Enregistre et pousse les changements vers GitHub. GitHub Pages republiera automatiquement.

## Limites honnêtes d'un site sans base de données
- Le progrès est sauvegardé dans le navigateur de chaque visiteur avec `localStorage`; il ne se synchronise pas entre appareils.
- Il n'y a pas d'espace administrateur sécurisé. Le contenu du site se gère en modifiant les fichiers dans le dépôt GitHub.
- Le « فضاء الأولياء » explique l'export manuel du progrès ; un parent peut consulter le fichier qu'on lui partage, mais ne peut pas consulter les données d'un enfant à distance automatiquement.
- Les fichiers publics peuvent être téléchargés par tout le monde.
- Le service worker et l'installation PWA nécessitent HTTPS, comme fourni par GitHub Pages.
- Le cache hors ligne est best-effort ; la première visite doit charger les fichiers au moins une fois.
- Les trois PDF inclus sont des exemples pédagogiques originaux, pas des examens officiels complets. Vérifie les droits et la qualité des documents que tu ajoutes.

## Sécurité et confidentialité
Aucun secret, clé API, code parent ou mot de passe n'est intégré au site. N'ajoute jamais de clé secrète à un dépôt public. Les données locales peuvent être supprimées si l'utilisateur efface les données du navigateur. Le site ne promet pas de synchronisation ni d'authentification qu'il ne possède pas.

## Fichiers principaux
- `index.html` : interface et sections
- `app.js` : recherche, quiz, tâches, export et thème
- `resources.json` : catalogue des ressources
- `pdf/` : documents
- `manifest.webmanifest`, `sw.js`, `icon.svg` : fonctions PWA
