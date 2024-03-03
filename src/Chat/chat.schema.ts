import * as Yup from 'yup'

const chatGetAllResponseSchema = Yup.array(
  Yup.object({
    id: Yup.string(),
    firstUser: Yup.object({
      username: Yup.string(),
    }),
    secondUser: Yup.object({
      username: Yup.string(),
    }),
    createdAt: Yup.date(),
    updatedAt: Yup.date(),
  }),
)

const chatCreateBodySchema = Yup.object({
  user: Yup.string().required(),
})

const chatGetOneResponseSchema = Yup.object({
  id: Yup.string(),
  firstUser: Yup.object({
    username: Yup.string(),
  }),
  secondUser: Yup.object({
    username: Yup.string(),
  }),
  createdAt: Yup.date(),
  updatedAt: Yup.date(),
})

const chatGetMessagesResponseSchema = Yup.array(
  Yup.object({
    chatId: Yup.string(),
    sender: Yup.string(),
    text: Yup.string(),
    createdAt: Yup.date(),
    updatedAt: Yup.date(),
  }),
)

const chatMessageCreateSchema = Yup.object({
  text: Yup.string().required(),
})

export {
  chatGetAllResponseSchema,
  /* */
  chatCreateBodySchema,
  /* */
  chatGetOneResponseSchema,
  /* */
  chatGetMessagesResponseSchema,
  /* */
  chatMessageCreateSchema,
}
