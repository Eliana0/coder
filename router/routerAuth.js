import express from "express";
import passport from "passport";
const router = express.Router();

router.get('/', passport.authenticate('google', {scope: ['profile', 'mail']}))

router.get('/out', passport.authenticate('google', {failureRedirect: '/logout', successRedirect: '/'}),
function(req, res) {
    res.redirect('/out')
})

export default router;