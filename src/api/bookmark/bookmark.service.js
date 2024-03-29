const { ErrorHandler } = require('../../utils/error')
const Bookmark = require('./bookmark.model')
const News = require('../news/news.model')

module.exports = {
	getAllBookmarks: async () => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await Bookmark.find()

				if (doc) resolve(doc)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	getBookmarkPerUser: async (bookmark) => {
		return new Promise(async (resolve, reject) => {
			try {
				// let resp = []
				// let doc = await News.find()
				// 	.select('-news -createdAt -updatedAt -__v')
				// 	.sort({
				// 		createdAt: 'desc',
				// 	})

				// let bookData = await Bookmark.find({ user })
				// for (let i = 0; i < doc.length; i++) {
				// 	doc[i] = doc[i].toJSON()
				// 	for (let j = 0; j < bookData.length; j++) {
				// 		if (bookData[j].news.toString() == doc[i]._id.toString()) {
				// 			doc[i].isBookmark = true
				// 			resp.push(doc[i])
				// 		}
				// 	}
				// }

				// if (doc) resolve(resp)
				let resp = []
				let doc = await News.find({
					_id: {
						$in: bookmark,
					},
				})
					.select('-news -createdAt -updatedAt -__v')
					.sort({
						createdAt: 'desc',
					})
				for (let i = 0; i < doc.length; i++) {
					let element = doc[i]
					element = element.toJSON()
					element.isBookmark = false
					for (let j = 0; j < bookmark.length; j++) {
						if (bookmark[j] == element._id.toString()) element.isBookmark = true
					}
					resp.push(element)
				}
				if (doc) resolve(resp)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	storeBookmark: async (bookmark) => {
		return new Promise(async (resolve, reject) => {
			try {
				let isExist = await Bookmark.findOne({
					user: bookmark.user,
					news: bookmark.news,
				})
				if (isExist) throw new ErrorHandler(409, 'Sudah ada')
				const doc = await Bookmark.create(bookmark)
				resolve(doc)
			} catch (error) {
				reject(error)
			}
		})
	},

	deleteBookmark: async (bookmark) => {
		return new Promise(async (resolve, reject) => {
			try {
				const doc = await Bookmark.findOneAndRemove({
					user: bookmark.user,
					news: bookmark.news,
				})
				resolve(doc)
			} catch (error) {
				reject(error)
			}
		})
	},
}
