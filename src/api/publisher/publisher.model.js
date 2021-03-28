const { model, Schema } = require('mongoose')

module.exports = model(
	'Publisher',
	new Schema(
		{
			name: {
				type: String,
			},
			image: {
				type: String,
			},
		},
		{
			collection: 'publisher',
			timestamps: true,
		},
	),
)
