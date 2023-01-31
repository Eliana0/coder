import express from "express";
const router = express.Router();
import { User } from '../models/User.js'

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

router.post('/',async (req, res) => {
    req.session.user = {
        name: req.body.name
    }
    let user = new User({
        password: req.body.password,
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