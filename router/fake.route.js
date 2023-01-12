const express = require("express");
const router = express.Router();

const Contenedor = require('../Contents/fakeJSON.js')
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

module.exports = router