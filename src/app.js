require('moment-timezone')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const moment = require('moment')

const { ErrorHandler, handleError } = require('./utils/error')
const routes = require('./config/routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get(`/`, (req, res) => {
	res.json({
		isSucces: true,
		message: 'Hello, World!',
		now: moment().tz('Asia/Jakarta').format('YYYY-MM-D HH:mm:ss'),
	})
})
app.use(routes)
app.use((err, req, res, next) => {
	handleError(err, res)
})

module.exports = app
