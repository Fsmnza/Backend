import express from 'express'
import cors from 'cors'

import configuration from '@/configuration'
import router from '@/router'
import database from './database'

const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(express.json())

app.use(router)

database.initialize(() => {
  app.listen(configuration.PORT, () => {
    console.log(`[server]: server listen on port: ${configuration.PORT}`)
  })
})
