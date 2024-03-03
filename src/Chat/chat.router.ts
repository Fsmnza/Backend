import { authMiddleware } from '@/Auth/auth.middleware'
import { Router } from 'express'
import chatModel from './chat.model'
import {
  chatCreateBodySchema,
  chatGetAllResponseSchema,
  chatGetMessagesResponseSchema,
  chatGetOneResponseSchema,
  chatMessageCreateSchema,
} from './chat.schema'
import { chatMessageModel } from '@/Chat/chat.model'

const chatRouter = Router()

chatRouter.get('/', authMiddleware, async function (req, res) {
  try {
    const user = req.app.locals.userId

    const findChats = await chatModel
      .find({
        $or: [{ firstUser: user }, { secondUser: user }],
      })
      .populate('firstUser')
      .populate('secondUser')
      .exec()

    const validatedResponse = await chatGetAllResponseSchema.validate(findChats, {
      stripUnknown: true,
    })

    res.json({
      chats: validatedResponse,
    })
  } catch (error) {
    console.log(error)

    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

chatRouter.post('/', authMiddleware, async function (req, res) {
  try {
    const validatedData = await chatCreateBodySchema.validate(req.body, { stripUnknown: true })

    const findChat = await chatModel.findOne({
      $or: [
        { firstUser: req.app.locals.userId, secondUser: validatedData.user },
        { secondUser: req.app.locals.userId, firstUser: validatedData.user },
      ],
    })

    if (findChat) {
      return res
        .json({
          chatId: findChat._id,
        })
        .end()
    }

    const createdChat = new chatModel({
      firstUser: req.app.locals.userId,
      secondUser: validatedData.user,
    })

    await createdChat.save()

    return res
      .json({
        chatId: createdChat._id,
      })
      .end()
  } catch (error) {
    console.log(error)

    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

chatRouter.get('/:id/', authMiddleware, async function (req, res, next) {
  try {
    const user = req.app.locals.userId

    const findChat = await chatModel
      .findOne({
        _id: req.params.id,
        $or: [
          {
            firstUser: user,
          },
          {
            secondUser: user,
          },
        ],
      })
      .populate('firstUser')
      .populate('secondUser')
      .exec()

    if (!findChat) {
      return next()
    }

    const validatedResponse = await chatGetOneResponseSchema.validate(findChat, {
      stripUnknown: true,
    })

    return res.json(validatedResponse).end()
  } catch (error) {
    console.log(error)

    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

chatRouter.get('/:id/messages/', authMiddleware, async function (req, res, next) {
  try {
    const user = req.app.locals.userId

    const findChat = await chatModel.findOne({
      _id: req.params.id,
      $or: [
        {
          firstUser: user,
        },
        {
          secondUser: user,
        },
      ],
    })

    if (!findChat) {
      return next()
    }

    const findMessages = await chatMessageModel.find({
      chatId: findChat._id,
    })

    const validatedResponse = await chatGetMessagesResponseSchema.validate(findMessages, {
      stripUnknown: true,
    })

    return res
      .json({
        messages: validatedResponse,
      })
      .end()
  } catch (error) {
    console.log(error)

    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

chatRouter.post('/:id/messages/', authMiddleware, async function (req, res, next) {
  try {
    const user = req.app.locals.userId

    const validatedData = await chatMessageCreateSchema.validate(req.body, { stripUnknown: true })

    const findChat = await chatModel.findOne({
      _id: req.params.id,
      $or: [
        {
          firstUser: user,
        },
        {
          secondUser: user,
        },
      ],
    })

    if (!findChat) {
      return next()
    }

    const newMessage = new chatMessageModel({
      chatId: findChat._id,
      sender: user,
      text: validatedData.text,
    })

    await newMessage.save()

    return res.status(204).end()
  } catch (error) {
    console.log(error)

    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

export default chatRouter
