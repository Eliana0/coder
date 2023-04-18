import mongoose from "mongoose"
import { Products } from "../models/productos.models.js"
import { User } from "../models/User.js"
import { Carrito } from "../models/carrito.models.js"

class Contenedor {
    constructor() {
        this.products = Products
        this.user = User
        this.cart = Carrito
    }

    Save = async(nombre, timestamp, foto, precio) => {
        try{
            const newProduct = new this.cart({
                nombre: nombre, 
                timestamp: timestamp,  
                foto: foto, 
                precio: precio 
            })
            return newProduct
        }catch(err){return err}
    }
    
    getAll = async() => {
        try{
            const get = await this.cart.find()
            return get 
        }catch(err){return err}
    }  
    
    getById = async(_id) => {
        try{
            const getById = await this.cart.findById(_id)
            return getById
        }catch(err){return err}
    }
    
    update = async(_id, archivo) => {
        try{
            const actualiza = await this.cart.findByIdAndUpdate(_id, {
            mensaje: archivo.mensaje
            })
            return actualiza
        }catch(err){return err}
    }
    
    delete = async(_id) => {
        try{
            await this.cart.findByIdAndDelete({ _id })
            return get
        }catch(err){return err}
    }
    deleteAll = async(_id) => {
        try{
            await this.cart.deleteMany()
            return get
        }catch(err){return err}
    }
}

export default Contenedor