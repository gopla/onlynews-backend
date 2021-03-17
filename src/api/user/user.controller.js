const userService = require('./user.service')

module.exports = {
	async index(req, res, next) {
		try {
			const result = await userService.getAllUser()
			res.send(result)
		} catch (error) {
			next(error)
		}
	},

	async store(req, res, next) {
		try {
			const result = await userService.storeNewUser(req.body)
			res.send(result)
		} catch (error) {
			next(error)
		}
	},

	async login(req, res, next) {
		try {
			const result = await userService.login(req.body)
			res.send(result)
		} catch (error) {
			next(error)
		}
	},

	async register(req, res, next) {
		try {
			const result = await userService.register(req.body)
			res.send(result)
		} catch (error) {
			next(error)
		}
	},
}
