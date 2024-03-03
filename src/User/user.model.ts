import mongoose from 'mongoose'

const { Schema } = mongoose

const User = new Schema(
  {
    /* BASE USER INFO */
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    /* END BASE USER INFO */

    /* USER PROFILE INFO */
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    middleName: {
      type: String,
      default: '',
    },
    birthday: {
      type: Date,
      default: null,
      nullable: true,
    },
    gender: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
    jobTitle: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    hobbies: {
      type: String,
      default: '',
    },
    zodiacSign: {
      type: String,
      default: '',
    },
    education: {
      type: String,
      default: '',
    },
    aboutMe: {
      type: String,
      default: '',
    },
    /* END USER PROFILE INFO */
  },
  {
    timestamps: true,
    collection: 'Users',
  },
)

export default mongoose.model('User', User)
