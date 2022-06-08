import mongoose from 'mongoose'

class User extends mongoose.Schema {}
export const UserModel = mongoose.model('User', new User())
