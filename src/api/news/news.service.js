const { ErrorHandler } = require('../../utils/error')
const News = require('./news.model')

module.exports = {
	getAllNews: () => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await News.find()
					.select('-news -createdAt -updatedAt -__v')
					.sort({
						createdAt: 'desc',
					})

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	getNewsById: (Id) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await News.findById(Id)

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	getNewsByTopic: (topic) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await News.find({ topic }).sort({ createdAt: 'desc' })

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},
	getNewsByPublisher: (publisher) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await News.find({ publisher }).sort({ createdAt: 'desc' })

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},
	getRandomNews: () => {},
}
