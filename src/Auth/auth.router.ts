import userModel from '@/User/user.model'
import { checkHash } from '@/helpers/hash'
import { createToken } from '@/jwt'
import { Router } from 'express'

import { authTokenBodySchema } from './auth.schema'

const authRouter = Router()

authRouter.post('/token/', async function (req, res) {
  try {
    const validatedData = await authTokenBodySchema.validate(req.body, { stripUnknown: true })

    const findUser = await userModel
      .findOne({
        $or: [{ email: validatedData.login }, { username: validatedData.login }],
      })
      .catch(() => null)

    if (!findUser) {
      return res
        .status(400)
        .json({
          message: 'Login or Password are invalid',
        })
        .end()
    }

    const checkPassword = await checkHash(validatedData.password, findUser.password)

    if (!checkPassword) {
      return res
        .status(400)
        .json({
          message: 'Login or Password are invalid',
        })
        .end()
    }

    return res.json({
      access: createToken(String(findUser._id)),
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: (error as any)?.message })
      .end()
  }
})

export default authRouter
