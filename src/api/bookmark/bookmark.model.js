const { model, Schema } = require('mongoose')

module.exports = model(
	'Bookmark',
	new Schema(
		{
			news:{
        type: Schema.Types.ObjectId,
        ref: 'News'
      },
      user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
		},
		{
			collection: 'bookmark',
			timestamps: true,
		},
	),
)
