import configuration from '@/configuration'
import mongoose from 'mongoose'

export default {
  async initialize(callback?: () => void) {
    try {
      await mongoose.connect(configuration.ATLAS_URI)

      callback?.()
    } catch (error) {
      console.log(error)

      process.exit(1)
    }
  },
}
