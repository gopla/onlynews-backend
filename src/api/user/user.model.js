const { model, Schema } = require('mongoose')

module.exports = model(
	'User',
	new Schema(
		{
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
				unique: true,
			},
			googleId: {
				type: String,
				required: true,
			},
		},
		{
			collection: 'user',
			timestamps: true,
		},
	),
)
