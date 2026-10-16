# TAALIM DZ — Version Excellence

Plateforme éducative statique, en arabe RTL, conçue pour GitHub Pages sans base de données.

## Fonctionnalités
- 13 entrées de niveau (primaire, moyen, secondaire, BEM et BAC) et filtrage par cycle.
- Navigation par matière avec liens de recherche externes spécialisés.
- Bibliothèque filtrable; trois PDF locaux intégrés.
- Quiz interactif avec feedback et explication immédiate.
- Examen d'entraînement chronométré avec correction et résultat.
- Cartes de révision, planificateur de tâches, suivi local, thème sombre, export JSON, impression et PWA/cache hors ligne de base.
- Pas de comptes, mots de passe, backend ou base de données.

## Publier sur GitHub Pages
1. Créez un dépôt GitHub public, par exemple `taalim-dz`.
2. Téléversez **le contenu** de ce dossier à la racine du dépôt (`index.html`, `app.js`, `pdf/`, etc.).
3. Ouvrez Settings → Pages → Build and deployment → Deploy from a branch.
4. Choisissez la branche `main`, le dossier `/(root)`, puis Save.
5. Attendez le déploiement; GitHub affichera l'URL publique.

## Limites à connaître
Cette version est fonctionnelle comme site statique mais **ne contient pas encore tous les cours et examens de chaque année**. Elle inclut seulement trois PDF locaux. Les autres ressources ouvrent des recherches externes et ne sont ni hébergées ni vérifiées par TAALIM DZ. Ajoutez des documents vérifiés, autorisés à la redistribution et correctement corrigés avant de présenter la bibliothèque comme exhaustive.

Les tâches, préférences, ressources sauvegardées et résultats sont conservés dans `localStorage` du navigateur. Ils ne se synchronisent pas entre appareils et peuvent être effacés par la suppression des données du navigateur. Un espace sécurisé avec comptes et synchronisation nécessiterait un service backend, ce qui n'est pas inclus.

## Ajouter un PDF
1. Placez le PDF dans `pdf/`.
2. Ajoutez une entrée dans `resources` au début de `app.js`, avec un titre, un `level` correspondant à un identifiant dans `levels`, une matière, un type et le chemin du fichier.
3. Vérifiez le PDF, le lien et les droits d'utilisation.

Les questions intégrées sont des exemples pédagogiques originaux, pas des sujets officiels. Vérifiez le programme et les matières pour chaque filière avant usage public.
