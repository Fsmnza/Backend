import * as Yup from 'yup'

const userCreateBodySchema = Yup.object({
  email: Yup.string().email().required(),
  username: Yup.string().min(4).required(),
  password: Yup.string().min(4).required(),
})

const userCreateResponseSchema = Yup.object({
  id: Yup.string(),
  email: Yup.string(),
  username: Yup.string(),
})

const userUpdateBodySchema = Yup.object({
  email: Yup.string().email(),
  phoneNumber: Yup.string(),
  username: Yup.string().min(4),

  firstName: Yup.string(),
  lastName: Yup.string(),
  middleName: Yup.string(),
  birthday: Yup.string(),
  gender: Yup.string(),
  height: Yup.string(),
  jobTitle: Yup.string(),
  country: Yup.string(),
  city: Yup.string(),
  hobbies: Yup.string(),
  zodiacSign: Yup.string(),
  education: Yup.string(),
  aboutMe: Yup.string(),

  showEmail: Yup.bool(),
  showPhoneNumber: Yup.bool(),
})

const userUpdateResponseSchema = Yup.object({
  id: Yup.string(),

  email: Yup.string(),
  phoneNumber: Yup.string(),
  username: Yup.string(),

  firstName: Yup.string(),
  lastName: Yup.string(),
  middleName: Yup.string(),
  birthday: Yup.string().nullable(),
  gender: Yup.string(),
  height: Yup.string(),
  jobTitle: Yup.string(),
  country: Yup.string(),
  city: Yup.string(),
  hobbies: Yup.string(),
  zodiacSign: Yup.string(),
  education: Yup.string(),
  aboutMe: Yup.string(),

  showEmail: Yup.bool(),
  showPhoneNumber: Yup.bool(),
})

const userUpdatePasswordBodySchema = Yup.object({
  oldPassword: Yup.string().required(),
  newPassword: Yup.string().min(4).required(),
})

export {
  userCreateBodySchema,
  userCreateResponseSchema,
  /*  */
  userUpdateBodySchema,
  userUpdateResponseSchema,
  /*  */
  userUpdatePasswordBodySchema,
}
