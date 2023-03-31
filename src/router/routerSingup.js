import express from "express";
import createLogger from "../functions/logger.js"
import { sessionChecher, validateUsers } from "../controllers/operaciones.js";

const router = express.Router();
const logger = createLogger('PROD')

router.get('/', sessionChecher, (req, res) => {
    logger.warn('ingreso a la ruta /singup')
    res.render("singup.ejs")
})

router.post('/', validateUsers, async (req, res) => {
})

export default router;