const { model, Schema } = require('mongoose')

module.exports = model(
	'News',
	new Schema(
		{
			user: {
				type: Schema.Types.ObjectId,
				ref: 'user',
			},
			topic: {
				type: Schema.Types.ObjectId,
				ref: 'topic',
			},
		},
		{
			collection: 'news',
			timestamps: true,
		},
	),
)
