import { Schema } from "mongoose";
import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export const productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    descripción: {
        type: Object,
        required: true
    },
    foto: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    }
},{
    timestamp: true
})

export const  Products  = mongoose.model("Products", productsSchema)