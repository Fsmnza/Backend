import { checkToken } from '@/jwt'
import { NextFunction, Request, Response } from 'express'

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(' ')?.[1] || ''

    const { userId } = checkToken(token)

    req.app.locals.userId = userId

    next()
  } catch (error) {
    console.log(error)

    res.json({ error }).end()
  }
}
