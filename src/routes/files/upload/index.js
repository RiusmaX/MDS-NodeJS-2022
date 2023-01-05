const router = require('express').Router()
const { dirname } = require('path')
// Récupération du nom du dossier de l'application (basé sur l'emplacement de l'index.js principal)
const appDir = dirname(require.main.filename)
const { sanatizeFilename } = require('../../../tools/strings')

// Instanciation de multer
const multer = require('multer')
const { createFile } = require('../../../controllers/filesController')
const withAuth = require('../../../middlewares/auth')

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

const authorizedTypes = [
  'png',
  'jpeg',
  'jpg',
  'gif',
  'webp',
  'webm',
  'pdf'
]

// Création du middleware d'upload
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const type = file.mimetype.split('/')[1]
    if (authorizedTypes.includes(type)) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('File type must be ' + authorizedTypes))
    }
  }
})

// Route d'API
router.route('/')
  .post(withAuth, upload.single('file'), async (req, res) => {
    const { file, userId } = req
    try {
      const savedFileObject = await createFile(file, userId)
      return res.send(savedFileObject)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
