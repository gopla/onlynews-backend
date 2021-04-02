require('dotenv').config()
const { ErrorHandler } = require('../../utils/error')
const User = require('./user.model')
const UserTopic = require('../usertopic/usertopic.model')
const Topic = require('../topic/topic.model')
const { sign } = require('jsonwebtoken')

module.exports = {
	getAllUser: () => {
		return User.find()
	},

	storeNewUser: async (body) => {
		return new Promise(async (resolve, reject) => {
			try {
				const userExist = await User.find({ email: body.email })
				if (userExist.length != 0)
					throw new ErrorHandler(409, 'Email already exist')

				const doc = await User.create(body)

				if (doc) resolve(doc)
			} catch (error) {
				reject(error)
			}
		})
	},

	login: async (body) => {
		return new Promise(async (resolve, reject) => {
			try {
				let topic = []
				let user = await User.findOne({ email: body.email })
				if (user == null) user = await User.create(body)
				const token = await sign({ user }, process.env.JWT_SECRET)
				let dataTopic = await UserTopic.find({ user: user._id }).select(
					'-id -createdAt -updatedAt -__v',
				)
				for (let i = 0; i < dataTopic.length; i++) {
					let theTopic = await Topic.findById(dataTopic[i].topic)
					topic.push(theTopic.name)
				}
				user = user.toJSON()
				user.topic = topic
				if (token)
					resolve({
						name: user.name,
						email: user.email,
						foto: user.foto,
						topic: user.topic,
						token,
					})
			} catch (error) {
				reject(error)
			}
		})
	},

	profile: async (userId) => {
		return new Promise(async (resolve, reject) => {
			try {
				let topic = []
				let doc = await User.findById(userId).select(
					'-createdAt -updatedAt -__v',
				)
				let dataTopic = await UserTopic.find({ user: userId }).select(
					'-id -createdAt -updatedAt -__v',
				)

				for (let i = 0; i < dataTopic.length; i++) {
					let theTopic = await Topic.findById(dataTopic[i].topic)
					topic.push(theTopic.name)
				}
				doc = doc.toJSON()
				doc.topic = topic

				if (doc) resolve(doc)
			} catch (error) {
				reject(error)
			}
		})
	},

	loginAndroid: async (body) => {
		return new Promise(async (resolve, reject) => {
			try {
				let topic = []
				let user = await User.findOne({
					email: body.email,
				})

				let isPassMatch = await User.findOne({
					email: body.email,
					password: body.password,
				})
				if (!isPassMatch) throw new ErrorHandler(404, 'Password tidak cocok')
				if (user == null) user = await User.create(body)
				const token = await sign({ user }, process.env.JWT_SECRET)
				let dataTopic = await UserTopic.find({ user: user._id }).select(
					'-id -createdAt -updatedAt -__v',
				)
				for (let i = 0; i < dataTopic.length; i++) {
					let theTopic = await Topic.findById(dataTopic[i].topic)
					topic.push(theTopic.name)
				}
				user = user.toJSON()
				user.topic = topic
				if (token)
					resolve({
						name: user.name,
						email: user.email,
						foto: user.foto,
						topic: user.topic,
						token,
					})
			} catch (error) {
				reject(error)
			}
		})
	},
}
