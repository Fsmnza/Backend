import * as Yup from 'yup'

const recommendationResponseSchema = Yup.array(
  Yup.object({
    id: Yup.string(),
    username: Yup.string(),
    firstName: Yup.string(),
    lastName: Yup.string(),
    middleName: Yup.string(),
    birthday: Yup.date().nullable(),
    gender: Yup.string(),
    height: Yup.string(),
  }),
)

export { recommendationResponseSchema }
