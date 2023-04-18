import { Products } from "../models/productos.models.js"

class ProductContent {
    constructor() {
        this.products = Products
    }
    
    Save = async(name, timestamp, descripción, foto, precio, stock) => {
        try{
            let product = new this.products({
                name: name,
                timestamp: timestamp, 
                descripción: descripción,
                foto: foto,
                precio: precio,
                stock: stock
            })
            return product
        }catch(err){return err}
    }
    getAll = async() => {
        try{
            let all = await this.products.find()
            return all
        }catch(err){return err}
    }
    getById = async(_id) => {
        try{
            const product = await this.products.findById({ _id }).exec();
            return product
        }catch(err){return err}
    }
    update = async(_id, precio, stock) => {
        try{
            await this.products.findByIdAndUpdate(_id, { precio: `${precio}`, stock: `${stock}` })
        }catch(err){return err}
    }
    delete = async(_id) => { 
        try{
            await this.products.findByIdAndDelete({ _id })
        }catch(err){return err}
    }
}

export default ProductContent