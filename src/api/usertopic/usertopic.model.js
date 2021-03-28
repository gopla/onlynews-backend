const { model, Schema } = require('mongoose')

module.exports = model(
	'Usertopic',
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
			collection: 'usertopic',
			timestamps: true,
		},
	),
)
