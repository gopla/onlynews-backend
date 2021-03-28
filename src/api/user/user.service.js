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
				let user = await User.findOne({ email: body.email })
				if (user == null) user = await User.create(body)
				const token = await sign({ user }, process.env.JWT_SECRET)
				if (token)
					resolve({
						name: user.name,
						email: user.email,
						foto: user.foto,
						token,
					})
			} catch (error) {
				reject(error)
			}
		})
	},
}
