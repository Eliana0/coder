import { Schema } from "mongoose";
import mongoose from 'mongoose'
import dotenv from "dotenv"

dotenv.config()

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

export const carritoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    foto: {
        type: String,
        required: true,
    },
},{
    timestamps: true
})

export const  Carrito  = mongoose.model("Carrito", carritoSchema)