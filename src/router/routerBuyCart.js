import express from "express";
import cartControllers from "../controllers/cartControllers.js";

const router = express.Router();

router.get('/', cartControllers.buyCart)

export default router;