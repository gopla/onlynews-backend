const { ErrorHandler } = require('../../utils/error')
const News = require('./news.model')
const Bookmark = require('../bookmark/bookmark.model')
const moment = require('moment')

async function getToday() {
	return await moment().tz('Asia/Jakarta').format('YYYY-MM-DD')
}

module.exports = {
	getAllNews: (user) => {
		return new Promise(async (resolve, reject) => {
			try {
				let resp = []
				const doc = await News.find({
					createdAt: { $gt: await getToday() },
				})
					.select('-news -createdAt -updatedAt -__v')
					.sort({
						createdAt: 'desc',
					})

				let bookData = await Bookmark.find({ user })
				for (let i = 0; i < doc.length; i++) {
					doc[i] = doc[i].toJSON()
					doc[i].isBookmark = false
					for (let j = 0; j < bookData.length; j++) {
						if (bookData[j].news.toString() == doc[i]._id.toString())
							doc[i].isBookmark = true
					}
					resp.push(doc[i])
				}

				if (doc) resolve(resp)
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
				await News.findOneAndUpdate({ _id: Id }, { $inc: { views: 1 } }).exec()

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	getNewsByTopic: (topic, user) => {
		return new Promise(async (resolve, reject) => {
			try {
				let resp = []
				const doc = await News.find({ topic })
					.select('-news -createdAt -updatedAt -__v')
					.sort({ createdAt: 'desc' })

				let bookData = await Bookmark.find({ user })
				for (let i = 0; i < doc.length; i++) {
					doc[i] = doc[i].toJSON()
					doc[i].isBookmark = false
					for (let j = 0; j < bookData.length; j++) {
						if (bookData[j].news.toString() == doc[i]._id.toString())
							doc[i].isBookmark = true
					}
					resp.push(doc[i])
				}

				if (doc) resolve(resp)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	getNewsByPublisher: (publisher, user) => {
		return new Promise(async (resolve, reject) => {
			try {
				let resp = []
				const doc = await News.find({ publisher })
					.select('-news -createdAt -updatedAt -__v')
					.sort({ createdAt: 'desc' })

				let bookData = await Bookmark.find({ user })
				for (let i = 0; i < doc.length; i++) {
					doc[i] = doc[i].toJSON()
					doc[i].isBookmark = false
					for (let j = 0; j < bookData.length; j++) {
						if (bookData[j].news.toString() == doc[i]._id.toString())
							doc[i].isBookmark = true
					}
					resp.push(doc[i])
				}

				if (doc) resolve(resp)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	getRandomNews: () => {},

	getNewsByTitle: (title, user) => {
		return new Promise(async (resolve, reject) => {
			try {
				let resp = []
				const doc = await News.find({ title: { $regex: title, $options: 'i' } })
					.select('-news -createdAt -updatedAt -__v')
					.sort({ createdAt: 'desc' })

				let bookData = await Bookmark.find({ user })
				for (let i = 0; i < doc.length; i++) {
					doc[i] = doc[i].toJSON()
					doc[i].isBookmark = false
					for (let j = 0; j < bookData.length; j++) {
						if (bookData[j].news.toString() == doc[i]._id.toString())
							doc[i].isBookmark = true
					}
					resp.push(doc[i])
				}

				if (doc) resolve(resp)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	getNewsByUserTopic: () => {},
}
