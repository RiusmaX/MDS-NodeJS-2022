const router = require('express').Router()
const { dirname } = require('path')
const File = require('../../../data/models/File')
const withAuth = require('../../../middlewares/auth')
// Récupération du nom du dossier de l'application (basé sur l'emplacement de l'index.js principal)
const appDir = dirname(require.main.filename)
// Récupération du chemin d'accès aux fichiers
const filesDir = appDir + '/../files/'

router.route('/')
  .get(withAuth, (req, res) => {
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

router.route('/:id')
  .get(withAuth, async (req, res) => {
    const { id } = req.params
    try {
      // On récupère le fichier
      const file = await File.findById(id)
      if (file) {
        // On vérifie que l'utilisateur a bien accès au fichier demandé
        const fileObject = file.toObject()
        // On compare le user du fichier avec le user contenu dans le token
        if (fileObject.user.equals(req.userId)) {
          return res.download(fileObject.path, (error) => {
            console.error(error)
            return res.status(500).send(error)
          })
        } else {
          return res.status(402).send('You are not authorized to access this file')
        }
      } else {
        return res.status(404).send('File not found')
      }
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
