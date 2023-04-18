import express from "express";
import productsControllers from "../controllers/productsControllers.js";

const router = express.Router();

router.get('/', productsControllers.getAllProducts)
/*     productsControllers.actualizeProducts, 
    productsControllers.newProduct, 
    productsControllers.deleteProduct, */

export default router;