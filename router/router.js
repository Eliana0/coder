const express = require("express");
const router = express.Router();

const Contenedor = require('../Contents/Content.js')
const contenedor = new Contenedor()

router.get('/', (req, res)=> {
        contenedor.getAll()
        .then(result => 
            res.send(result))
        .catch(err => console.log(err))
})

router.post('/', (req, res)=> {
        let body = req.body;
            contenedor.Save();
            res.json({message: "Producto guardado", producto: body}) 
})

router.get('/:id', (req, res)=> {
    const number = req.params.id;
    if(!number){
        res.json({message: "Producto no encontrado"})
    }else{
        contenedor.getById(parseInt(number))
        .then(result => res.send(result))
        .catch(err => console.log(err))
    }
})

router.put('/:id', (req, res) => {
    const number  = req.params.id;
    const body = req.body;
    if(!body){
        res.json({message: 'Producto no encontrado'})
    }else{
        contenedor.updateById(number, body) 
        res.json({message: 'Producto actualizado', producto: body});
    }
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.json({message: 'Producto no encontrado'})
    }else{
        let content = contenedor.deleteById(parseInt(id), productosRandom);
        content ? res.json({message: `${id} eliminado`}) : res.json({message: `No se encuentra el producto`})
    }
})


module.exports = router