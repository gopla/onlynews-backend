const { ErrorHandler } = require('../../utils/error')
const News = require('./news.model')
const Bookmark = require('../bookmark/bookmark.model')
const UserTopic = require('../usertopic/usertopic.model')
const Topic = require('../topic/topic.model')
const moment = require('moment')

async function getToday() {
	return await moment().tz('Asia/Jakarta').add(-2, 'days').format('YYYY-MM-DD')
}

module.exports = {
	getAllNews: (user) => {
		return new Promise(async (resolve, reject) => {
			try {
				let resp = []
				let topic = []
				let dataTopic = await UserTopic.find({ user }).select(
					'-id -createdAt -updatedAt -__v',
				)

				for (let i = 0; i < dataTopic.length; i++) {
					let theTopic = await Topic.findById(dataTopic[i].topic)
					topic.push({ topic: theTopic.name.toLowerCase() })
				}

				let whereClause = user
					? {
							createdAt: { $gt: await getToday() },
							$or: topic,
					  }
					: {
							createdAt: { $gt: await getToday() },
					  }
				let doc = await News.find(whereClause)
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
				resp.length >= 30 ? (resp.length = 30) : resp.length
				if (doc) resolve(resp)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	getNewsById: (Id, user) => {
		return new Promise(async (resolve, reject) => {
			try {
				let resp = {}
				let doc = await News.findById(Id).select('-__v -createdAt -updatedAt')
				await News.findOneAndUpdate({ _id: Id }, { $inc: { views: 1 } }).exec()

				let bookData = await Bookmark.find({ user })
				doc._doc.isBookmark = false
				for (let j = 0; j < bookData.length; j++) {
					if (bookData[j].news.toString() == doc._id.toString())
						doc._doc.isBookmark = true
					else doc._doc.isBookmark = false
				}

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

	getNewsByUserTopic: (user) => {
		return new Promise(async (resolve, reject) => {
			try {
				let resp = []
				let topic = []
				let dataTopic = await UserTopic.find({ user }).select(
					'-id -createdAt -updatedAt -__v',
				)

				for (let i = 0; i < dataTopic.length; i++) {
					let theTopic = await Topic.findById(dataTopic[i].topic)
					topic.push({ topic: theTopic.name.toLowerCase() })
				}

				console.log(topic)
				const doc = await News.find({
					createdAt: { $gt: await getToday() },
					$or: topic,
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
}
