const router = require('express').Router()
const { dirname } = require('path')
// Récupération du nom du dossier de l'application (basé sur l'emplacement de l'index.js principal)
const appDir = dirname(require.main.filename)
const { sanatizeFilename } = require('../../../tools/strings')

// Instanciation de multer
const multer = require('multer')
const File = require('../../../data/models/File')
const User = require('../../../data/models/User')
const { createFile } = require('../../../controllers/filesController')

// Création du stockage sur le disque physique de la machine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appDir + '/../files/')
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + '_' + sanatizeFilename(file.originalname))
  }
})

// Création du middleware d'upload
const upload = multer({ storage }) // = multer({ storage: storage })

// Route d'API
router.route('/')
  .post(upload.single('file'), async (req, res) => {
    // TODO REMPLACER PAR ID DU TOKEN
    const userId = '6399842861ba5bbedbeff3db'
    const { file } = req
    try {
      const savedFileObject = await createFile(file, userId)
      return res.send(savedFileObject)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
