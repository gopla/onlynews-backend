const newsService = require('./news.service')

module.exports = {
	index: async (req, res, next) => {
		try {
			const data = await newsService.getAllNews(req.body.bookmark)
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
			const data = await newsService.getNewsById(
				req.params.id,
				req.body.bookmark,
			)
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

	topic: async (req, res, next) => {
		try {
			data = await newsService.getNewsByTopic(
				req.params.topic,
				req.body.bookmark,
			)
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

	publisher: async (req, res, next) => {
		try {
			data = await newsService.getNewsByPublisher(
				req.params.publisher,
				req.body.bookmark,
			)
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

	title: async (req, res, next) => {
		try {
			data = await newsService.getNewsByTitle(
				req.params.title,
				req.body.bookmark,
			)
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

	usertopic: async (req, res, next) => {
		try {
			const data = req.user
				? await newsService.getNewsByUserTopic(req.user._id)
				: await newsService.getNewsByUserTopic()
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
