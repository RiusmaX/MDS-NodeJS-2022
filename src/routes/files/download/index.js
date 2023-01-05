const router = require('express').Router()
const { dirname } = require('path')
// Récupération du nom du dossier de l'application (basé sur l'emplacement de l'index.js principal)
const appDir = dirname(require.main.filename)
// Récupération du chemin d'accès aux fichiers
const filesDir = appDir + '/../files/'

router.route('/')
  .get((req, res) => {
    const { body } = req
    // On vérifie les paramètres
    // TODO Sera remplacé par l'ID du fichier dans la base de données
    if (!body.fileName) {
      return res.status(404).send('File not found')
    }
    // On lance un téléchargement du fichier en fonction de son nom (fileName)
    return res.download(filesDir + body.fileName, (error) => {
      console.error(error)
      return res.status(500).send(error)
    })
  })

module.exports = router
