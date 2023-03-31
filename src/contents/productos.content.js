import mongoose from "mongoose";

class ProductContent {
    constructor(productos, products) {
        this.products = mongoose.model(productos, products)
    }
    
    Save = async(archivo) => {
        try{
            await this.products.add(archivo)
        }catch(err){return err}
    }
    getAll = async() => {
        try{
            const getProducts = await this.products.get()
            let res = getProducts.forEach(e => console.log({ id: e.id, ...e.data() }));
            return res
        }catch(err){return err}
    }
    getById = async(id) => {
        try{
        const doc = this.products.doc(`${id}`);
        const item = await doc.get();
        const response = item.data();
            return response
        }catch(err){return err}
    }
    update = async(id, archivo) => {
        try{
            await this.products.doc(`${id}`).update(archivo)
        }catch(err){return err}
    }
    delete = async(id) => { 
        try{
            await this.products.doc(`${id}`).delete()
        }catch(err){return err}
    }
}

export const Content = ("ProductContent", ProductContent)