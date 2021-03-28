const { ErrorHandler } = require('../../utils/error')
const News = require('./news.model')
const moment = require('moment')

async function getToday() {
	return await moment().tz('Asia/Jakarta').format('YYYY-MM-DD')
}

module.exports = {
	getAllNews: () => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await News.find({
					createdAt: { $gt: await getToday() },
				})
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
				const doc = await News.find({ topic })
					.select('-news -createdAt -updatedAt -__v')
					.sort({ createdAt: 'desc' })

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
				const doc = await News.find({ publisher })
					.select('-news -createdAt -updatedAt -__v')
					.sort({ createdAt: 'desc' })

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},
	getRandomNews: () => {},
	getNewsByTitle: (title) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await News.find({ title: { $regex: title, $options: 'i' } })
					.select('-news -createdAt -updatedAt -__v')
					.sort({ createdAt: 'desc' })

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},
}
