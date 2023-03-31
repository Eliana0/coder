import { User } from "../models/User.js"
import { passwordHash } from "../functions/crypt.js"
import createLogger from "../functions/logger.js"
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
    const {name, mail, password, adress, age, number, img} = req.body
    if((password).length < 5){
        logger.error('Se necesita una contraseña son más de 5 caracteres')
    }else{
        logger.warn('Se registró un nuevo usuario')
        let pass= password;
        let user = new User({
            password: passwordHash(pass),
            mail: mail,
            name: name,
            adress: adress, 
            age: age,
            number: number,
            img: img
        })
        user.save((err, docs) => {
            if(err) {
                res.redirect('/singup')
            }else{
                mongoose.user = docs
                res.redirect('/out')
            }
        })
    }next()
}
