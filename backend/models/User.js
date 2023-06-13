import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min: 5,
        max: 10
    },
    lasttName:{
        type: String,
        required: true,
        min: 2,
        max: 10
    },
    email:{
        type: String,
        required: true,
        max: 30,
        unique: true
    },
    password:{
        type: String,
        require: true,
        max: 10
    },
    pictureURL:{
        type: String,
        default: 'https://cdn.dribbble.com/users/1787323/screenshots/6604852/lazycat_code-01_4x.png?compress=1&resize=768x576&vertical=center'
    },
    friends:{
        type: Array,
        default: []
    },
    location: String,
    occupation: String
})

const User = mongoose.model('User', UserSchema)

export default User