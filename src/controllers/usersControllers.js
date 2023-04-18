import mongoose from "mongoose"
import userContent from "../contents/user.content.js"
import createLogger from "../functions/logger.js"
import { hashOut } from '../functions/crypt.js'
import usersDTO from "../dtos/dtos.users.js"
import email from "../functions/ethereal.js"

const usercontent = new userContent()
const logger = createLogger('PROD')


const postLogin = async(req, res) => {
    logger.warn('ingreso a la ruta /login')
    
    let {mail, password} = req.body;
    let user = await usercontent.addLogin(mail)
    if(!user){
        res.redirect('/login') 
        logger.error('Usuario no registrado')
    }if(!hashOut(user, password)){
        res.redirect('/login')
        logger.error('Usuario no registrado')
    }
    req.session.user = user
    mongoose.user = user;
    res.redirect('/')
}

const getOut = async (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        let user = new usersDTO(req.session.user)
        logger.warn('ingreso a la ruta /out')
        res.render("out.ejs", {user: user})
   }else{
    logger.error('ingreso a la ruta /out denegado. No está registrado')
        res.redirect('/login')
    }
}

const getLogout = async (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        logger.warn('ingreso a la ruta /logout')
        res.clearCookie('user_sid')
        res.send(`Hasta luego ` + req.session.user.name + '<a href="/login"><button type="button" class="btn btn-info">Inicio</button></a>');
        delete req.body.name;
    }else{
        logger.error('No puede acceder al /logout, no está registrado')
        res.redirect('/login')
    }
}

const newUser = async (req, res) => {
    logger.warn('Se registró un nuevo usuario')
    const {name, mail, password, adress, age, number, img} = req.body
    email(name, mail)
    let user = await usercontent.newUser(name, mail, password, adress, age, number, img)
    user.save((err, docs) => {
        if(err) {
            res.redirect('/singup')
        }else{
            mongoose.user = docs
            req.session.user = docs
            res.redirect('/')
        }
    })
}

const deleteUser = async (req, res) => {
    logger.warn('ingreso a la ruta /deleteUser')
    const mail= mongoose.user.mail;
    await usercontent.deleteUser(mail)
    res.send('Usuario borrado')
}

export default {
    postLogin,
    getLogout,
    getOut,
    newUser,
    deleteUser
}