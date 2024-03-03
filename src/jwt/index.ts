import configuration from '@/configuration'
import jwt from 'jsonwebtoken'

function createToken(userId: string) {
  return jwt.sign(
    {
      userId,
    },
    configuration.JWT_SECRET,
    {
      expiresIn: '30d',
    },
  )
}

function checkToken(token: string) {
  return jwt.verify(token, configuration.JWT_SECRET) as { userId: string }
}

export { createToken, checkToken }
