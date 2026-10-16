# TAALIM DZ — Version multipage Plus

## Fonctionnalités
- Bibliothèque intégrée et catalogue `resources.js` / `resources.json`, avec les PDF présents dans `pdf/`.
- Pages séparées : accueil, niveaux, bibliothèque, vidéos YouTube par niveau et matière, exercices, examen BAC/BEM, cartes, planning, parents, sources, aide, gamification, jeux, parcours personnalisé, assistant pédagogique local, créateur de fiches, mode hors connexion et accès.
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
- Trois codes de cycle (primaire, collège, lycée) sont configurés dans auth.js et ne sont pas affichés dans l’interface. Attention : un site statique ne peut pas garder ces codes secrets contre l’inspection des fichiers JavaScript ; ils organisent l’accès mais ne constituent pas une sécurité forte.
- L'assistant pédagogique fonctionne localement avec un petit ensemble d'explications. Un véritable chatbot IA nécessite un backend et une clé API protégée.
- Les fiches locales sont des supports d'entraînement originaux et ne remplacent pas les sujets officiels.
- Le mode hors connexion dépend du navigateur, du HTTPS et de la capacité de cache disponible.

## Vidéos éducatives
La page `videos.html` propose des liens YouTube par classe et matière. La plupart ouvrent une recherche YouTube ciblée afin de rester utiles lorsque de nouvelles vidéos sont publiées. Les vidéos externes peuvent changer ou afficher des publicités.


## Nouveaux espaces (version sans base de données)
- `kids.html` : espace primaire illustré, mini-défis et liens YouTube éducatifs.
- `teachers.html` : formulaire de proposition de séance et lien de réunion externe.
- `admin.html` : prototype local d’annonces et nouveautés, avec export JSON.
- `community.html` : prototype de fil de discussion parents/enseignants.

**Limites importantes :** ces pages utilisent `localStorage`. Les annonces, propositions de cours et messages ne sont visibles que dans le navigateur qui les a créés ; ils ne sont pas partagés entre visiteurs. Le panneau d’administration n’est pas sécurisé. Les cours en direct nécessitent un service de réunion externe. Pour de véritables comptes, annonces partagées, messagerie privée et modération, il faudra ultérieurement un backend ou une plateforme tierce. Les liens YouTube sont des recherches par sujet, pas une validation de chaque vidéo.


## Préparation à la commercialisation
- La page `offres.html` sert de présentation commerciale provisoire ; elle ne facture pas et ne crée pas d'abonnement. Définir les tarifs, les conditions, le contact commercial et la politique de remboursement avant la mise en vente.
- `teachers.html` permet de créer un support de cours autonome au format HTML, puis de le télécharger, l'imprimer ou le partager manuellement. Le lien de visioconférence doit être créé dans le service choisi par l'enseignant.
- Aucun outil local ne synchronise automatiquement les données entre plusieurs appareils. Pour des cours publiés pour tous, une messagerie parent-professeur, des comptes et une vérification réelle des abonnements, connecter une plateforme backend/authentification et un prestataire de paiement.
- Pour protéger les élèves, éviter de publier les liens privés de visioconférence, noms complets, numéros de téléphone ou informations personnelles dans les espaces publics.

## Formules commerciales (à valider avant publication)
La page `offres.html` propose des modèles de vente : code mensuel, pass trimestre, pass annuel, pack famille, code cadeau, packs BEM/BAC et séances d'enseignants. Les montants affichés sont des suggestions de départ en dinars algériens, non des tarifs actifs. La page ne prend aucun paiement et ne crée pas automatiquement de codes. Avant de vendre, choisir les prix définitifs, afficher les conditions de durée/remboursement et connecter un service fiable d'authentification, d'expiration des accès et de paiement. Les codes côté client ne constituent pas une protection forte.


## Version finale statique (sans base de données)
- `contact.html` : contact externe WhatsApp (numéro professionnel à renseigner par le propriétaire).
- `planning.html` : planning d’exemple modifiable manuellement dans GitHub.
- `cours-en-ligne.html` : présentation des cours à distance et consignes de partage des liens privés.
- `offres.html` : vente manuelle; le paiement est confirmé par l’administration et le code est envoyé manuellement.

Aucune base de données ni paiement en ligne n’est intégré. Les annonces, cours et messages ne sont pas partagés automatiquement entre visiteurs. Le contenu statique et les PDF d’un dépôt public ne sont pas protégés par un code JavaScript.


## Parcours d'accès et limites importantes

- Le dépôt utilise une page d'accès qui demande de choisir un profil (élève, parent ou professeur) puis un code. La page d'accueil racine redirige vers le profil correspondant.
- Cette vérification est réalisée en JavaScript dans le navigateur : elle améliore l'organisation du parcours, mais **ne protège pas réellement des contenus payants**. Ne publiez pas de documents confidentiels ou dont l'accès doit être strictement réservé.
- Les données locales (planning, scores, favoris) restent sur l'appareil et ne sont pas synchronisées entre plusieurs personnes ou appareils.
- Les cours en ligne doivent utiliser un lien de visioconférence externe. Pour une messagerie partagée et des abonnements sécurisés, il faudra un service externe avec contrôle d'accès côté serveur.
- Avant de publier, vérifiez `auth.js`, le dossier `pdf/` et les liens depuis un téléphone. Après mise à jour, faites un rechargement forcé ou videz le cache du navigateur si l'ancienne version reste affichée.
