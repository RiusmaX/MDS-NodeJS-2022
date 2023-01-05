Exercice :
Objectif : 
1. Enregistrer les fichiers dans la base de données :
  1. Créer le modèle de base de donnée pour les fichiers
    a. L'utilisateur qui a créé le fichier (propriétaire)
    b. La date et l'heure de création du fichier
    c. Le nom du fichier
    d. L'URL du fichier (sans le domaine) ex: /files/<nom_du_fichier>
  2. Enregistrer le fichier en BDD lors d'un upload

2. Authentifier / protéger l'appel d'API d'upload & download

3. Modifier la méthode download pour télécharger un fichier par son ID et non pas par son nom
  BONUS : Récupérer l'ID dans le body de la requête ET/OU dans les params


--------------

4. Valider le propriétaire du fichier au téléchargement
