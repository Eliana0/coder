import createLogger from "../functions/logger.js"
import usersControllers from "../controllers/usersControllers.js";
import mongoose from "mongoose";

const logger = createLogger('PROD')

//SINGUP

export const sessionChecher = (req, res, next) => {
    if(mongoose.user && req.cookies.user_sid){
        res.redirect('/out')
    }else{
        next()
    }
}

export const validateUsers = (req, res, next) => {
    const {password} = req.body
    const letraRegex = /[A-Za-z]/;
    const numeroRegex = /\d/;
    if((password).length < 5){
        console.log('Se necesita una contraseña son más de 5 caracteres')
        res.render("singup.ejs")
    } if(!password) {
        console.log('La contraseña es requerida.')
        res.render("singup.ejs")
    } if (!letraRegex.test(password) || !numeroRegex.test(password)) {
        console.log('La contraseña debe contener al menos una letra y un número.')
        res.render("singup.ejs")
    }else{
        next()
    }
}
