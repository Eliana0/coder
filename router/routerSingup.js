import express from "express";
import { User } from '../models/User.js'
import { passwordHash } from '../crypt.js'

const router = express.Router();
const app = express()


const sessionChecher = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/out')
    }else{
        next()
    }
}

/* const verifiData = (req, res) => {
    let {name, mail, password} = req.body
    if (name.length <= 2) return {message: 'Su nombre de usuario debe tener al menos 3 caracteres.'}
    if (password.length <= 5 ) return {message: 'Su contraseña debe tener al menos 6 caracteres.'}
    if (!mail.split("@") && !mail.split(".com")) return {message: 'El correo ingresado es invalido, ingrese su correo original.'}
   } */

router.get('/', sessionChecher, (req, res) => {
    res.render("singup.ejs")
})

router.post('/'/* , verifiData */, async (req, res) => {
    let {name, mail, password} = req.body
    if (name.length <= 2) return {message: 'Su nombre de usuario debe tener al menos 3 caracteres.'}
    if (password.length <= 5 ) return {message: 'Su contraseña debe tener al menos 6 caracteres.'}
    if (!mail.split("@") && !mail.split(".com")) return {message: 'El correo ingresado es invalido, ingrese su correo original.'}
    req.session.user = {
        name: req.body.name,
        mail: req.body.name,
        password: req.body.password
    }
    let pass= req.body.password;
    let user = new User({
        password: passwordHash(pass),
        mail: req.body.mail,
        name: req.body.name
    })
    user.save((err, docs) => {
        if(err) {
            res.redirect('/singup')
        }else{
            req.session.user = docs
            res.redirect('/out')
        }
    })
})

export default router;