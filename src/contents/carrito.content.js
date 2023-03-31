import mongoose from "mongoose"
import { Carrito } from "../models/carrito.models.js"

class Contenedor {
    constructor(productos, Carrito) {
        this.products = mongoose.model(productos, Carrito)
    }

    Save = async(archivo) => {
        try{
            const newMensaje = new this.products.create(archivo)
            return newMensaje
        }catch(err){return err}
    }
    
    getAll = async() => {
        try{
            const get = await this.products.find()
            return get 
        }catch(err){return err}
    }  
    
    getById = async(id) => {
        try{
            const getById = await this.products.findById(id)
            return getById
        }catch(err){return err}
    }
    
    update = async(id, archivo) => {
        try{
            const actualiza = await this.products.findByIdAndUpdate(id, {
            mensaje: archivo.mensaje
            })
            return actualiza
        }catch(err){return err}
    }
    
    delete = async(id) => {
        try{
            await UserModel.findByIdAndDelete(id)
            const get = await this.productos.find()
            return get
        }catch(err){return err}
    }
}

export default Contenedor