import { Schema } from "mongoose";

export const products = new Schema({
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