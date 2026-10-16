# TAALIM DZ — Version multipage Plus

## Fonctionnalités
- Bibliothèque intégrée et catalogue `resources.js` / `resources.json`, avec les PDF présents dans `pdf/`.
- Pages séparées : accueil, niveaux, bibliothèque, exercices, examen BAC/BEM, cartes, planning, parents, sources, aide, gamification, jeux, parcours personnalisé, assistant pédagogique local, créateur de fiches, mode hors connexion et accès.
- Gamification : points calculés depuis les résultats, les tâches terminées et les jeux ; badges locaux.
- Jeux : calcul mental et vocabulaire avec correction et score.
- Parcours personnalisé : plan de révision, recommandations et ajout des étapes au planning local.
- TAALIM Assistant : règles pédagogiques locales et explications prédéfinies. Il ne s'agit pas d'une IA générative connectée.
- Créateur de fiches : génère un fichier HTML imprimable/téléchargeable avec corrigé modèle.
- Parents : synthèse locale et export/impression.
- Hors connexion : cache des pages visitées, avec option pour précharger les ressources et PDF.
- Mode sombre, favoris, recherche, filtres, tâches, scores, impression et export de progrès existants.

## Démarrage local
Décompressez l'archive et ouvrez `index.html`. Les pages et fonctions de base s'affichent, mais les service workers et le mode hors connexion nécessitent HTTPS ou localhost.

## Publication GitHub Pages
1. Décompressez l'archive.
2. Téléversez tous les fichiers et le dossier `pdf/` à la racine du dépôt.
3. Dans Settings → Pages, choisissez Deploy from a branch, `main`, `/(root)`.
4. Attendez le déploiement, puis ouvrez l'URL donnée par GitHub.

## Limites honnêtes
- Site statique sans base de données : les données restent sur le navigateur actuel, pas de synchronisation.
- Les codes d'accès de démonstration sont visibles dans le code livré et ne protègent pas réellement les contenus.
- L'assistant pédagogique fonctionne localement avec un petit ensemble d'explications. Un véritable chatbot IA nécessite un backend et une clé API protégée.
- Les fiches locales sont des supports d'entraînement originaux et ne remplacent pas les sujets officiels.
- Le mode hors connexion dépend du navigateur, du HTTPS et de la capacité de cache disponible.
