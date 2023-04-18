import express from "express";
import usersControllers from "../controllers/usersControllers.js";
import passport from 'passport'
const router = express.Router();

/* router.post('/login', passport.authenticate('login', { failureRedirect: '/singup'}), (req, res) => {
    res.send({ message: "Logged In"})
}) */
router.get('/', (req, res) => { res.render("login.ejs") })
router.post('/', usersControllers.postLogin)

export default router;