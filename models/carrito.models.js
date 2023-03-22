import { Schema } from "mongoose";

export const Carrito = new Schema({
    nombre: {
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
    timestamps: true
})