import { authMiddleware } from '@/Auth/auth.middleware'
import { Router } from 'express'
import { likesCreateBodySchema, likesGetResponseSchema } from './likes.schema'
import userModel from '@/User/user.model'
import likesModel from './likes.model'

const likesRouter = Router()

likesRouter.post('/', authMiddleware, async function (req, res) {
  try {
    const validatedBody = await likesCreateBodySchema.validate(req.body, { stripUnknown: true })

    const findUser = await userModel.findById(validatedBody.user)

    if (!findUser) {
      return res
        .status(400)
        .json({
          message: 'User not found',
        })
        .end()
    }

    const findLike = await likesModel.findOne({
      user: validatedBody.user,
      createdBy: req.app.locals.userId,
    })

    if (findLike) {
      return res
        .json({
          message: 'Like already exsist',
        })
        .end()
    }

    await new likesModel({
      createdBy: req.app.locals.userId,
      user: findUser,
      liked: validatedBody.liked,
    }).save()

    return res.status(204).end()
  } catch (error) {
    console.log(error)

    return res
      .status(400)
      .json({ error: (error as any)?.message })
      .end()
  }
})

likesRouter.get('/', authMiddleware, async function (req, res) {
  try {
    const findedLikes = await likesModel
      .find({
        user: req.app.locals.userId,
        liked: true,
      })
      .populate('createdBy')
      .exec()

    const validatedBody = await likesGetResponseSchema.validate(findedLikes, { stripUnknown: true })

    return res.json(validatedBody).end()
  } catch (error) {
    console.log(error)

    return res
      .status(400)
      .json({ error: (error as any)?.message })
      .end()
  }
})

export default likesRouter
