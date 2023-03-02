import express from "express";
import { User } from '../models/User.js'
import { hashOut } from '../crypt.js'
import createLogger from "../functions/logger.js"

const router = express.Router();
const logger = createLogger('PROD')


router.get('/', (req, res) => {
    res.render("login.ejs")
})

router.post('/', async (req, res) => {
    logger.warn('ingreso a la ruta /login')
    let {mail, password} = req.body;
    try{
        let user = await User.findOne({ mail }).exec()
        if(!user){
            res.redirect('/login') 
            alert('Usuario no registrado')
            logger.error('Usuario no registrado')
        }if (!hashOut(user, password)) {
            res.redirect('/login')
            alert('Usuario no registrado')
            logger.error('Usuario no registrado')
        }
            req.session.user = user;
            res.redirect('/out')
    }catch(err){console.log(err)}
})

export default router;