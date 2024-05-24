import mongoose, {Schema} from 'mongoose'


const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true,'Password is required']
    },
    img: {
        type: String
    },
    roles: {
        type: [String],
        default: ['USER_ROLE'],
        enum: ['USER_ROLE','ADMIN_ROLE']
    }
})

export const UserModel = mongoose.model('User',UserSchema )