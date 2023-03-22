import express from "express";
import createLogger from "../functions/logger.js"
import mongoose from "mongoose";

const router = express.Router();
const logger = createLogger('PROD')

router.get('/', async (req, res) => {
    if(mongoose.user && req.cookies.user_sid){
        logger.warn('ingreso a la ruta /out')
        res.send('Bienvenido ' + mongoose.user.name + '<a href="/logout" type="button" class="btn btn-info">Deslogueo</a>')
   }else{
    logger.error('ingreso a la ruta /out denegado. No está registrado')
        res.redirect('/login')
    }
})

export default router;