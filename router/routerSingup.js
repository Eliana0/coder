import express from "express";
import validateUsers from '../functions/validateUsers.js'
import createLogger from "../functions/logger.js"
import mongoose from "mongoose";

const router = express.Router();
const logger = createLogger('PROD')

const sessionChecher = (req, res, next) => {
    if(mongoose.user && req.cookies.user_sid){
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