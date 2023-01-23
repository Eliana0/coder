const mongoose = require('mongoose')

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/coder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    }
})

const userModel = mongoose.model('user', userSchema)
module.exports = userModel