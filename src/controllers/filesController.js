const File = require('../data/models/File')
const User = require('../data/models/User')

const createFile = async (file, userId) => {
  if (!file) {
    throw new Error('Missing file')
  }

  const newFile = new File({
    fileName: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    path: file.path,
    size: file.size,
    user: userId
  })

  const savedFile = await newFile.save()

  // Mise à jour de l'utilisateur avec sa liste de fichiers
  if (savedFile) {
    await User.findByIdAndUpdate(userId,
      { $push: { files: savedFile._id } },
      { new: true, useFindAndModify: false })
  }

  const savedFileObject = savedFile.toObject()
  return savedFileObject
}

module.exports = {
  createFile
}
