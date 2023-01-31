import mongoose from 'mongoose'

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/coder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
    password: String
})

export const  User  = mongoose.model("User", userSchema)
