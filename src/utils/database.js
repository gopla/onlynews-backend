require('dotenv').config()
const mongoose = require('mongoose')
const { CONNECTION_STRING } = process.env
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
}

module.exports = {
	connectDB: async () => {
		return await mongoose.connect(`${CONNECTION_STRING}`, options)
	},

	closeDB: async () => {
		return await mongoose.connection.close()
	},

	clearDB: async () => {
		return await mongoose.connection.dropDatabase()
	},
}
