const { ErrorHandler } = require('../../utils/error')
const Publisher = require('./publisher.model')

module.exports = {
	getAllPublishers: async () => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await Publisher.find().select(
					'-id -createdAt -updatedAt -__v',
				)

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	storePublisher: async (publisher) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await Publisher.create(publisher)
				resolve(doc)
			} catch (error) {
				reject(error)
			}
		})
	},
}
