import { Router } from 'express';
import mongoose from 'mongoose'
const router = Router();
const fecha = Date()

let productsDao

 import('../daos/daos.productos.js').then(({prod})=>{
    productsDao = new prod();
 })

let archivo = {
    nombre: "Tacos",
    timestamp: `${fecha}`,
    descripción: [
      "tortilla",
      "carne",
      "cebolla",
      "morrón",
      "queso",
      "salsa"
    ],
    foto: "https://th.bing.com/th/id/R.b9e921aeea76c1f79e4633e40543e0ee?rik=6rz2nNSRd7t3Ew&pid=ImgRaw&r=0",
    precio: 2800,
    stock: 4
}

router.get('/', (req, res)=> {
    productsDao.getAll()
        .then(result => 
            res.send(`${result}`))
        .catch(err => console.log(err))
})

router.post('/', (req, res)=> {
    if (!archivo.nombre && !archivo.precio){
        res.json({message: "Por favor, rellenar los campos requeridos"})
    }else{
        let body = req.body;
        productsDao.Save(archivo);
            res.json({message: "Producto guardado", producto: body}) 
    }
})

router.get('/:id', async(req, res)=> {
    const id = req.params.id;
    if(!id){
        res.json({message: "Producto no encontrado"})
    }else{
        res.json(productsDao.getById(`${id}`))
    }
})

router.put('/:id', (req, res) => {
    const Number  = req.params.id;
    const body = req.body;
    if(!body){
        res.json({message: 'Producto no encontrado'})
    }else{
        productsDao.update(Number ,body) 
        res.json({message: 'Producto actualizado', producto: body});
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.json({message: 'Producto no encontrado'})
    }else{
        let content = productsDao.delete(id, products);
        content ? res.json({message: `${id} eliminado`}) : res.json({message: `No se encuentra el producto`})
    }
})

export default router;