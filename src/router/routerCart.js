import express from "express";
import cartControllers from "../controllers/cartControllers.js";

const router = express.Router();

router.get('/', 
        cartControllers.getAllCart,
/*         cartControllers.addToCart, 
        cartControllers.deleteProductCart */)

export default router;