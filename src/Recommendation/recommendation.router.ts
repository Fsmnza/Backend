import { authMiddleware } from '@/Auth/auth.middleware'
import likesModel from '@/Likes/likes.model'
import userModel from '@/User/user.model'
import { Router } from 'express'
import { recommendationResponseSchema } from './recommendation.schema'

const recommendationRouter = Router()

recommendationRouter.get('/', authMiddleware, async function (req, res) {
  try {
    const users = await userModel.find({
      $nor: [{ _id: req.app.locals.userId }],
    })
    const likes = await likesModel.find()

    const sortedUsers = users.filter((user) => !likes.find((like) => like.user.equals(user._id)))

    const validatedResponse = await recommendationResponseSchema.validate(
      sortedUsers.map((user) => Object.assign(user, { id: user._id })),
      {
        stripUnknown: true,
      },
    )

    return res.json(validatedResponse).end()
  } catch (error) {
    console.error(error)

    return res
      .status(400)
      .json({
        error,
      })
      .end()
  }
})

export default recommendationRouter
