import mongoose from "mongoose"
import Content from "../contents/productos.content.js"
import createLogger from "../functions/logger.js"
const fecha = Date()

const productcontent = new Content()
const logger = createLogger('PROD')

let archivo = {
/*     nombre: "Ensalada de fruta",
    timestamp: `${fecha}`,
    descripción: [
      'manzana', 
      'kiwi', 
      'frambuesa', 
      'naranja',
      'granada' 
    ],
    foto: "https://th.bing.com/th/id/R.b041254f33f73fa4c745bc033554d526?rik=xHaqOPYFF3XseA&pid=ImgRaw&r=0",
    precio: 900,
    stock: 13 */
}

const newProduct = async (req, res) => {
    logger.warn('Se registró un nuevo producto')
    let name = archivo.nombre
    let timestamp= archivo.timestamp
    let descripción = archivo.descripción
    let foto= archivo.foto
    let precio= archivo.precio
    let stock= archivo.stock
    let prod = await productcontent.Save(name, timestamp, descripción, foto, precio, stock)
    prod.save((err, docs) => {
        if(err) {
            res.redirect('/login')
        }else{
            mongoose.prod = docs
            res.send('Nuevo producto registrado')
        }
    })
}
const getAllProducts = async(req, res) => {
    let all = await productcontent.getAll()
    res.render("products.ejs", {all: all})
}
const actualizeProducts = async(req, res) => {
    let id = req.params.id
    let precio= archivo.precio
    let stock= archivo.stock
    try{
        await productcontent.update(id, precio, stock)
        res.send(`Producto actualizado`)
    }catch(err){res.send(err)}
}
const deleteProduct = async(req, res) => {
    let id = req.params.id
    try{
        await productcontent.delete(id)
        res.send(`Producto borrado`)
    }catch(err){res.send(err)}
}

export default {
    newProduct,
    getAllProducts,
    actualizeProducts,
    deleteProduct
}