const topicService = require('./topic.service')

module.exports = {
	index: async (req, res, next) => {
		try {
			const data = await topicService.getAllTopics()
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
			const data = await topicService.storeTopic(req.body)
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
