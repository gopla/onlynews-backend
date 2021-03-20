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
			next(error)
		}
	},

	async register(req, res, next) {
		try {
			const data = await userService.register(req.body)
			res.send({
				success: true,
				statusCode: 200,
				data,
			})
		} catch (error) {
			next(error)
		}
	},
}
