const { ErrorHandler } = require('../../utils/error')
const Topic = require('./topic.model')

module.exports = {
	getAllTopics: async () => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await Topic.find().select('-id -createdAt -updatedAt -__v')

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	storeTopic: async (publisher) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await Topic.create(publisher)
				resolve(doc)
			} catch (error) {
				reject(error)
			}
		})
	},
}
