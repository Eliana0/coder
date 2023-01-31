import express from "express";
import { User } from '../models/User.js'
import { initializePassport } from '../passport.config.js'
import { passwordHash } from '../crypt.js'
import passport from 'passport'

const router = express.Router();
const app = express()

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

const sessionChecher = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/out')
    }else{
        next()
    }
}

router.get('/', sessionChecher, (req, res) => {
    res.render("singup.ejs")
})

router.post('/', async (req, res) => {
    req.session.user = {
        name: req.body.name,
        mail: req.body.name,
        password: req.body.password
    }
    let password= req.body.password;
    let user = new User({
        password: passwordHash(password),
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