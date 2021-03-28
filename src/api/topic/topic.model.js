const { model, Schema } = require('mongoose')

module.exports = model(
	'Topic',
	new Schema(
		{
			name: {
				type: String,
			},
		},
		{
			collection: 'topic',
			timestamps: true,
		},
	),
)
