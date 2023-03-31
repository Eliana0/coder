import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    password:  {
        type: String,
        unique: true,
        required: true,
    },
    mail:  {
        type: String,
        unique: true,
        required: true,
    },
    adress: {
        type: String,
        unique: true,
        required: false, 
    },
    age: {
        type: Number,
        unique: true,
        required: false, 
    },
    number: {
        type: Number,
        unique: true,
        required: true, 
    },
    img: {
        type: String,
        unique: true,
        required: false, 
    }
})

export const  User  = mongoose.model("User", userSchema)
