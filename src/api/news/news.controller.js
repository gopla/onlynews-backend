const newsService = require('./news.service')

module.exports = {
	index: async (req, res, next) => {
		try {
			const data = await newsService.getAllNews()
			res.send(data)
		} catch (error) {
			next(error)
		}
	},
	topic: async (req, res, next) => {
		try {
			const data = await newsService.getNewsByTopic(req.params.topic)
			res.send(data)
		} catch (error) {
			next(error)
		}
	},
	publisher: async (req, res, next) => {
		try {
			const data = await newsService.getNewsByPublisher(req.params.publisher)
			res.send(data)
		} catch (error) {
			next(error)
		}
	},
}
