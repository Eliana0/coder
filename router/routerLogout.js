import express from "express";
const router = express.Router();

router.get('/', async (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.clearCookie('user_sid')
        res.send(`Hasta luego ` + req.session.user.name + '<a href="/login"><button type="button" class="btn btn-info">Inicio</button></a>');
        delete req.body.name;
        res.redirect('/')
    }else{
        res.redirect('/login')
    }
})

export default router;