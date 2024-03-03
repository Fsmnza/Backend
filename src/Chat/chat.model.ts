import mongoose from 'mongoose'
const { Schema } = mongoose

const ChatMessage = new Schema(
  {
    chatId: {
      type: Schema.Types.ObjectId,
      ref: 'Chat',
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'ChatMessages',
  },
)

const Chat = new Schema(
  {
    firstUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    secondUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ChatMessage',
      },
    ],
  },
  {
    timestamps: true,
    collection: 'Chats',
  },
)

export default mongoose.model('Chat', Chat)
export const chatMessageModel = mongoose.model('ChatMessage', ChatMessage)
