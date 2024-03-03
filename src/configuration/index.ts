import dotenv from 'dotenv'

dotenv.config()

export default {
  PORT: process.env.PORT || 8000,
  ATLAS_URI: process.env.ATLAS_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
}
