import * as Yup from 'yup'

const likesCreateBodySchema = Yup.object({
  liked: Yup.bool().required(),
  user: Yup.string().required(),
})

const likesGetResponseSchema = Yup.array(
  Yup.object({
    createdBy: Yup.object({
      id: Yup.string(),
      username: Yup.string(),
    }),
    createdAt: Yup.date(),
    updatedAt: Yup.date(),
  }),
)

export { likesCreateBodySchema, likesGetResponseSchema }
