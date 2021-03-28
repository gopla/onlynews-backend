require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
	const bearer = req.headers['authorization']
	const token = bearer ? bearer.split(' ')[1] : undefined
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
			if (err) throw err
			req.user = payload.user
			next()
		})
	} else {
		res.status(403).send({
			success: false,
			statusCode: 403,
			message: 'unauthorization',
			data: null,
		})
	}
}
