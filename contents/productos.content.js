import admin from "firebase-admin"
import fs from "fs"
const serviceAccount = JSON.parse(fs.readFileSync("./firebase_productos.json", `utf-8`)) 

admin.initializeApp({credential: admin.credential.cert(serviceAccount)});

class ProductContent {
    constructor(productos) {
        const db = admin.firestore()
        this.products = db.collection(productos)
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