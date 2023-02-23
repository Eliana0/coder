import express from "express";
const router = express.Router();

router.get('/', async (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.send('Bienvenido ' + req.session.user.name + '<a href="/logout" type="button" class="btn btn-info">Deslogueo</a>')
   }else{
        res.redirect('/login')
    }
})

export default router;