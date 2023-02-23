import mongoose from 'mongoose'

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/coder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
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
    }
})

export const  User  = mongoose.model("User", userSchema)
