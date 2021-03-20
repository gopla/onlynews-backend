const newsService = require('./news.service')

module.exports = {
	index: async (req, res, next) => {
		try {
			const data = await newsService.getAllNews()
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
			const data = await newsService.getNewsById(req.params.id)
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
			const data = await newsService.getNewsByTopic(req.params.topic)
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
			const data = await newsService.getNewsByPublisher(req.params.publisher)
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
