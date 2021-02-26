const bookmarkService = require('./bookmark.service')

module.exports = {
  index: async(req, res, next) => {
    try {
      const data = await bookmarkService.getAllBookmarks()
      res.send(data)
    } catch (error) {
      next(error)
    }
  },
  show: async(req, res, next) => {
    try {
      const data = await bookmarkService.getBookmarkPerUser(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  },
  store: async(req, res, next) => {
    try {
      const data = await bookmarkService.storeBookmark(req.body)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}