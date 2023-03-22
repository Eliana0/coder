import { Router } from 'express';
const router = Router();
let date = Date()

let cartDao;

import('../daos/daos.carrito.js').then(({productos})=>{
    cartDao = new productos();
 })


const cart = {
    nombre: "Flan",
timestamp: date,
descripción: [
    "azucar",
    "leche",
    "huevo",
    "caramelo",
    "crema"
],
foto: "https://th.bing.com/th/id/R.1528ec1e2d18e1ecd13df4d855e15124?rik=cyJxqLiod1zz4g&pid=ImgRaw&r=0",
precio: 900,
stock: 18
}

    
router.get('/', (req, res)=> {
    cartDao.getAll()
        .then(result => 
            res.send(result))
        .catch(err => console.log(err))
})
    
router.post('/', (req, res)=> {
    if (!cart.nombre && !cart.precio){
        res.json({message: "Por favor, rellenar los campos requeridos"})
    }else{
        let body = req.body;
        cartDao.Save(cart);
            res.json({message: "Producto guardado", producto: body}) 
    }
})
    
router.get('/:id', async(req, res)=> {
    const id = req.params.id;
    if(!id){
        res.json({message: "Producto no encontrado"})
    }else{
        res.json(cartDao.getById(`${id}`))
    }
})
    
router.put('/:id', (req, res) => {
    const Number  = req.params.id;
    const body = req.body;
    if(!body){
        res.json({message: 'Producto no encontrado'})
    }else{
        cartDao.update(Number ,body) 
        res.json({message: 'Producto actualizado', producto: body});
    }
})
    
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if(!id){
        res.json({message: 'Producto no encontrado'})
    }else{
        let content = cartDao.delete(id, products);
        content ? res.json({message: `${id} eliminado`}) : res.json({message: `No se encuentra el producto`})
    }
})
    
export default router;