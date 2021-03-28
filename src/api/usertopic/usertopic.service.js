const { ErrorHandler } = require('../../utils/error')
const UserTopic = require('./usertopic.model')
const User = require('../user/user.model')
const Topic = require('../topic/topic.model')

module.exports = {
	getAllUserTopics: async (userId) => {
		return new Promise(async (resolve, reject) => {
			try {
				let topic = []
				let userData = await User.findById(userId).select(
					'-createdAt -updatedAt -__v',
				)

				userData = userData.toJSON()
				let dataTopic = await UserTopic.find({ user: userId }).select(
					'-id -createdAt -updatedAt -__v',
				)

				for (let i = 0; i < dataTopic.length; i++) {
					let theTopic = await Topic.findById(dataTopic[i].topic)
					topic.push(theTopic.name)
				}

				userData.topic = topic

				if (userData) resolve(userData)
				else throw new ErrorHandler(404, 'News not found')
			} catch (error) {
				reject(error)
			}
		})
	},

	storeUserTopic: async (usertopic) => {
		return new Promise(async (resolve, reject) => {
			try {
				let isExist = await UserTopic.findOne({
					user: usertopic.user,
					topic: usertopic.topic,
				})
				if (isExist) throw new ErrorHandler(409, 'Sudah ada')
				const doc = await UserTopic.create(usertopic)
				resolve(doc)
			} catch (error) {
				reject(error)
			}
		})
	},

	deleteTopic: async (usertopic) => {
		return new Promise(async (resolve, reject) => {
			try {
				console.log(usertopic)
				const doc = await UserTopic.findOneAndRemove({
					user: usertopic.user,
					topic: usertopic.topic,
				})
				resolve(doc)
			} catch (error) {
				reject(error)
			}
		})
	},
}
