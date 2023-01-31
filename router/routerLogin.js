import express from "express";
import { User } from '../models/User.js'

const router = express.Router();


router.get('/', (req, res) => {
    res.render("login.ejs")
})

router.post('/', async (req, res) => {
    let {mail, password} = req.body;
    try{
        let user = await User.findOne({ mail }).exec()
        if(!user){
            res.redirect('/login') 
        }if (user.password != password) {
            res.redirect('/login')
        }
            req.session.user = user;
            res.redirect('/out')
    }catch(err){console.log(err)}
})


export default router;