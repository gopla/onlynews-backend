const publisherService = require('./publisher.service')

module.exports = {
	index: async (req, res, next) => {
		try {
			const data = await publisherService.getAllPublishers()
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
			const data = await publisherService.storePublisher(req.body)
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
