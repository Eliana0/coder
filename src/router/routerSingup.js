import express from "express";
import createLogger from "../functions/logger.js"
import { sessionChecher, validateUsers } from "../controllers/operaciones.js";
import usersControllers from "../controllers/usersControllers.js";

const router = express.Router();
const logger = createLogger('PROD')

router.get('/', sessionChecher, (req, res) => {
    logger.warn('ingreso a la ruta /singup')
    res.render("singup.ejs")
})

router.post('/', validateUsers, usersControllers.newUser)

export default router;