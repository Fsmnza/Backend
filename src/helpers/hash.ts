import bcrypt from 'bcrypt'

function toHash(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

function checkHash(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export { toHash, checkHash }
