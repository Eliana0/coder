import express from "express";
import validateUsers from '../functions/validateUsers.js'
import createLogger from "../functions/logger.js"

const router = express.Router();
const logger = createLogger('PROD')

const sessionChecher = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/out')
    }else{
        next()
    }
}

router.get('/', sessionChecher, (req, res) => {
    logger.warn('ingreso a la ruta /singup')
    res.render("singup.ejs")
})

router.post('/', validateUsers, async (req, res) => {
})

export default router;