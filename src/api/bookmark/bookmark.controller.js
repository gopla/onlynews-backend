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
			console.log(error)
			next(error)
		}
	},
	show: async (req, res, next) => {
		try {
			const data = await bookmarkService.getBookmarkPerUser(req.body.bookmark)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			console.log(error)
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
			console.log(error)
			next(error)
		}
	},

	delete: async (req, res, next) => {
		try {
			const data = await bookmarkService.deleteBookmark({
				news: req.body.news,
				user: req.user._id,
			})
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			console.log(error)
			next(error)
		}
	},
}
