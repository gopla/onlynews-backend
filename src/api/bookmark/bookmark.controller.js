const bookmarkService = require('./bookmark.service')

module.exports = {
	index: async (req, res, next) => {
		try {
			const data = await bookmarkService.getAllBookmarks()
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			next(error)
		}
	},
	show: async (req, res, next) => {
		try {
			const data = await bookmarkService.getBookmarkPerUser(req.user._id)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			next(error)
		}
	},
	store: async (req, res, next) => {
		try {
			const data = await bookmarkService.storeBookmark({
				news: req.body.news,
				user: req.user._id,
			})
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			next(error)
		}
	},
}
