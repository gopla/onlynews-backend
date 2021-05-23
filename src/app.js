require('moment-timezone')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const moment = require('moment')
const { connectDB } = require('./utils/database')

const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroMongoose = require('@admin-bro/mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const { ErrorHandler, handleError } = require('./utils/error')
const routes = require('./config/routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

const adminBro = new AdminBro({
	resources: [
		{
			resource: require('./api/news/news.model'),
			options: {
				listProperties: ['date', 'title', 'link', 'topic', 'publisher'],
			},
		},
		{
			resource: require('./api/publisher/publisher.model'),
			options: {
				listProperties: ['name'],
			},
		},
		require('./api/topic/topic.model'),
		require('./api/user/user.model'),
	],
	rootPath: '/admin',
})
const router = AdminBroExpress.buildRouter(adminBro)
app.use(adminBro.options.rootPath, router)

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
