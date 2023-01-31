import express from "express";
import passport from 'passport'

const router = express.Router();


router.get('/', (req, res) => {
    res.render("login.ejs")
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/singup'}), (req, res) => {
    res.send({ message: "Logged In"})
})


/* router.post('/', async (req, res) => {
    let {mail, password} = req.body;
    try{
        let user = await User.findOne({ mail }).exec()
        if(!user){
            res.redirect('/login') 
        }if (password != User.password) {
            res.redirect('/login')
        }
            req.session.user = user;
            res.redirect('/out')
    }catch(err){console.log(err)}
}) */


export default router;