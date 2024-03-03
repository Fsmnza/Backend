import mongoose from 'mongoose'

const { Schema } = mongoose

const LikesModel = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    liked: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, collection: 'Likes' },
)

export default mongoose.model('Likes', LikesModel)
