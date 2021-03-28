const newsService = require('./news.service')

module.exports = {
	index: async (req, res, next) => {
		try {
			const data = req.user
				? await newsService.getAllNews(req.user._id)
				: await newsService.getAllNews()
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
			const data = req.user
				? await newsService.getNewsById(req.params.id, req.user._id)
				: await newsService.getNewsById(req.params.id)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			next(error)
		}
	},

	topic: async (req, res, next) => {
		try {
			data = req.user
				? await newsService.getNewsByTopic(req.params.topic, req.user._id)
				: await newsService.getNewsByTopic(req.params.topic)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			next(error)
		}
	},

	publisher: async (req, res, next) => {
		try {
			data = req.user
				? await newsService.getNewsByPublisher(
						req.params.publisher,
						req.user._id,
				  )
				: await newsService.getNewsByPublisher(req.params.publisher)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			next(error)
		}
	},

	title: async (req, res, next) => {
		try {
			data = req.user
				? await newsService.getNewsByTitle(req.params.title, req.user._id)
				: await newsService.getNewsByTitle(req.params.title)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
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
			next(error)
		}
	},
}
