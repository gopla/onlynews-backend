const usertopicService = require('./usertopic.service')

module.exports = {
	index: async (req, res, next) => {
		try {
			const data = await usertopicService.getAllUserTopics(req.user._id)
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
			const data = await usertopicService.storeUserTopic({
				topic: req.body.topic,
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
			const data = await usertopicService.deleteTopic({
				topic: req.body.topic,
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
