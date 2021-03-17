require('dotenv').config()
const { ErrorHandler } = require('../../utils/error')
const User = require('./user.model')
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
				const user = await User.findOne({ email: body.email })
				if (user.length == 0) throw new ErrorHandler(404, 'User not found')
				const token = await sign({ user }, process.env.JWT_SECRET)
				if (token) resolve({ token })
			} catch (error) {
				reject(error)
			}
		})
	},

	register: async (body) => {
		return new Promise(async (resolve, reject) => {
			try {
				const userExist = await User.find({ email: body.email })
				if (userExist.length != 0)
					throw new ErrorHandler(409, 'Email already exist')

				const doc = await User.create(body)
				const user = doc
				const token = await sign({ user }, process.env.JWT_SECRET)
				if (token) resolve({ token })
			} catch (error) {
				reject(error)
			}
		})
	},
}
