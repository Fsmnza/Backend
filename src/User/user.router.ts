import { Router } from 'express'

import userModel from './user.model'
import { checkHash, toHash } from '@/helpers/hash'
import {
  userCreateBodySchema,
  userCreateResponseSchema,
  userUpdateBodySchema,
  userUpdatePasswordBodySchema,
  userUpdateResponseSchema,
} from './user.schema'
import { authMiddleware } from '@/Auth/auth.middleware'

const userRouter = Router()

userRouter.post('/', async function (req, res) {
  try {
    const validatedUser = await userCreateBodySchema.validate(req.body, { stripUnknown: true })

    const findByUsername = await userModel
      .findOne({
        username: validatedUser.username,
      })
      .catch(() => null)

    if (findByUsername) {
      return res
        .status(400)
        .json({
          message: 'username already exist',
        })
        .end()
    }

    const findByEmail = await userModel
      .findOne({
        email: validatedUser.email,
      })
      .catch(() => null)

    if (findByEmail) {
      return res
        .status(400)
        .json({
          message: 'email already exist',
        })
        .end()
    }

    const user = new userModel({
      ...validatedUser,
      password: await toHash(validatedUser.password),
    })

    user.save()

    const validatedResponse = await userCreateResponseSchema
      .validate(
        {
          id: user._id,
          email: user.email,
          username: user.username,
        },
        { stripUnknown: true },
      )
      .catch(null)

    return res.json(validatedResponse).end()
  } catch (error) {
    console.log(error)

    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

userRouter.patch('/me/', authMiddleware, async function (req, res) {
  try {
    const validatedBody = await userUpdateBodySchema.validate(req.body, { stripUnknown: true })

    if (!Object.keys(validatedBody).length) {
      return res
        .status(400)
        .json({
          message: 'Not provied data to update',
        })
        .end()
    }

    const updatingUser = await userModel.findByIdAndUpdate(
      req.app.locals.userId,
      {
        $set: validatedBody,
      },
      { new: true },
    )

    if (!updatingUser) {
      return res
        .status(500)
        .json({
          message: 'Unknown error, user not updated',
        })
        .end()
    }

    const validatedResponse = await userUpdateResponseSchema
      .validate(Object.assign(updatingUser, { id: updatingUser._id }), { stripUnknown: true })
      .catch(null)

    return res.json(validatedResponse).end()
  } catch (error) {
    console.log(error)

    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

userRouter.post('/new-password/', authMiddleware, async function (req, res) {
  try {
    const validatedBody = await userUpdatePasswordBodySchema.validate(req.body, {
      stripUnknown: true,
    })

    const findUser = await userModel.findById(req.app.locals.userId)

    if (!findUser) {
      return res
        .status(400)
        .json({
          message: 'User not found',
        })
        .end()
    }

    const verifyPassword = await checkHash(validatedBody.oldPassword, findUser.password)

    if (!verifyPassword) {
      return res
        .status(400)
        .json({
          message: 'Old password is invalid',
        })
        .end()
    }

    await userModel.findByIdAndUpdate(req.app.locals.userId, {
      $set: {
        password: await toHash(validatedBody.newPassword),
      },
    })

    return res.status(204).end()
  } catch (error) {
    console.log(error)

    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

export default userRouter
