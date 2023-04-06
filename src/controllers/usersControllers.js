import mongoose from "mongoose"
import userContent from "../contents/user.content.js"
import createLogger from "../functions/logger.js"
import { hashOut } from '../functions/crypt.js'
import usersDTO from "../dtos/dtos.users.js"

const usercontent = new userContent()
const logger = createLogger('PROD')


const postLogin = async(req, res) => {
    logger.warn('ingreso a la ruta /login')
    let {mail, password} = req.body;
    let user = await usercontent.addLogin(mail)
    if(!user){
        res.redirect('/login') 
        res.send('Usuario no registrado')
        logger.error('Usuario no registrado')
    }if(!hashOut(user, password)){
        res.redirect('/login')
        res.send('Usuario no registrado')
        logger.error('Usuario no registrado')
    }
    mongoose.user = user;
    res.redirect('/out')
}

const getOut = async (req, res) => {
    if(mongoose.user && req.cookies.user_sid){
        let user = new usersDTO(mongoose.user)
        logger.warn('ingreso a la ruta /out')
        res.render("out.ejs", {user: user})
   }else{
    logger.error('ingreso a la ruta /out denegado. No está registrado')
        res.redirect('/login')
    }
}

const getLogout = async (req, res) => {
    if(mongoose.user && req.cookies.user_sid){
        logger.warn('ingreso a la ruta /logout')
        res.clearCookie('user_sid')
        res.send(`Hasta luego ` + mongoose.user.name + '<a href="/login"><button type="button" class="btn btn-info">Inicio</button></a>');
        delete req.body.name;
        res.redirect('/')
    }else{
        logger.error('No puede acceder al /logout, no está registrado')
        res.redirect('/login')
    }
}

const newUser = async (req, res) => {
    logger.warn('Se registró un nuevo usuario')
    const {name, mail, password, adress, age, number, img} = req.body
    let user = await usercontent.newUser(name, mail, password, adress, age, number, img)
    user.save((err, docs) => {
        if(err) {
            res.redirect('/singup')
        }else{
            mongoose.user = docs
            res.redirect('/out')
        }
    })

}

export default {
    postLogin,
    getLogout,
    getOut,
    newUser
}