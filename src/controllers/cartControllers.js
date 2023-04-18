import mongoose from "mongoose"
import ProductsContent from "../contents/productos.content.js"
import userContent from "../contents/user.content.js"
import Content from "../contents/carrito.content.js"
import createLogger from "../functions/logger.js"
import sms from "../functions/send.sms.js"
const date = Date()

const productcontent = new ProductsContent()
const usercontent = new userContent()
const cartcontent = new Content()
const logger = createLogger('PROD')


const addToCart = async (req, res) => {
    let id = req.params.id
    let productid= await productcontent.getById(id)

    let nombre = productid.name
    let timestamp= date
    let foto= productid.foto
    let precio= productid.precio
    let prod = await cartcontent.Save(nombre, timestamp, foto, precio)
    prod.save((err, docs) => {
        if(err) {
            console.log(err)
            res.redirect('/login')
        }else{
            mongoose.prod = docs
            res.send('Nuevo producto añadido al carrito')
            logger.warn('Se registró un nuevo producto')
        }
    })
}
const getAllCart = async(req, res) => {
    let all = await cartcontent.getAll()
    res.render("cart.ejs", {all: all})
}
const deleteProductCart = async(req, res) => {
    let id = req.params.id
    try{
        await cartcontent.delete(id)
        res.send(`Producto borrado`)
    }catch(err){res.send(err)}
}
const buyCart = async(req, res) => {
    try{
        let all = await cartcontent.getAll()
        let user = [req.session.user.name, req.session.user.number, req.session.user.adress, req.session.user.mail]
        let total= []
        all.forEach(e => {total.push(e.precio)})
        let precioTotal = total.reduce((a, b) => a + b, 0);
        sms(all, user, precioTotal)
        await cartcontent.deleteAll()
        res.send(`Su compra ha sido procesada correctamente`)
    }catch(err){
        res.send(err)
    }
}
    
export default {
    addToCart,
    getAllCart,
    deleteProductCart,
    buyCart
}