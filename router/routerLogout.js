import express from "express";
import createLogger from "../functions/logger.js"

const logger = createLogger('PROD')
const router = express.Router();

router.get('/', async (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        logger.warn('ingreso a la ruta /logout')
        res.clearCookie('user_sid')
        res.send(`Hasta luego ` + req.session.user.name + '<a href="/login"><button type="button" class="btn btn-info">Inicio</button></a>');
        delete req.body.name;
        res.redirect('/')
    }else{
        logger.error('No puede acceder al /logout, no está registrado')
        res.redirect('/login')
    }
})

export default router;