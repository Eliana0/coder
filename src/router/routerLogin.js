import express from "express";
import usersControllers from "../controllers/usersControllers.js";

const router = express.Router();

router.get('/', (req, res) => { res.render("login.ejs") })
router.post('/', usersControllers.postLogin)

export default router;