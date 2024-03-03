import * as Yup from 'yup'

const authTokenBodySchema = Yup.object({
  login: Yup.string().required(),
  password: Yup.string().required(),
})

export { authTokenBodySchema }
