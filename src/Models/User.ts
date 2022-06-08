import mongoose, { Schema } from 'mongoose'

class User {
  static init() {
    return new Schema({
      name: String,
      email: String,
      password: String,
      posts: [
        {
          title: String,
          description: String,
          likes: Number,
          date: Date,
        },
      ],
    })
  }
}

const user = User.init()
export const UserModel = mongoose.model('User', user)
