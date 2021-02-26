const { ErrorHandler } = require('../../utils/error')
const Bookmark = require('./bookmark.model')


module.exports = {
  getAllBookmarks: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await Bookmark.find().populate('user').populate('news').exec()
        
        if(doc) resolve(doc)
        else throw new ErrorHandler(404, 'News not found')
      } catch (error) {
        reject(error)
      }
    })
  },

  getBookmarkPerUser: async (user) => {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await Bookmark.find({user}).populate('user').populate('news').exec()
        
        if(doc) resolve(doc)
        else throw new ErrorHandler(404, 'News not found')
      } catch (error) {
        reject(error)
      }
    })
  },

  storeBookmark: async (bookmark) => {
    return new Promise(async (resolve, reject) => {
      try {
        const doc = await Bookmark.create(bookmark)
        resolve(doc)
      } catch (error) {
        reject(error)
      }
    })
  }
}