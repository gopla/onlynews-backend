const { profile } = require('./user.service')
const userService = require('./user.service')

module.exports = {
	async index(req, res, next) {
		try {
			const data = await userService.getAllUser()
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			console.log(error)
			next(error)
		}
	},

	async store(req, res, next) {
		try {
			const data = await userService.storeNewUser(req.body)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			console.log(error)
			next(error)
		}
	},

	async login(req, res, next) {
		try {
			const data = await userService.login(req.body)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			console.log(error)
			next(error)
		}
	},

	async loginAndroid(req, res, next) {
		try {
			const data = await userService.loginAndroid(req.body)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			console.log(error)
			next(error)
		}
	},

	async profile(req, res, next) {
		try {
			const data = await userService.profile(req.user._id)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			console.log(error)
			next(error)
		}
	},
}
