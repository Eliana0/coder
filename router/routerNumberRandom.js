import express from "express";
import { fork } from "child_process"
import createLogger from "../functions/logger.js"

const router = express.Router();
const logger = createLogger('DEV')

//1 número random del 1 al 100
router.get(`/`, (req, res) => {
    logger.warn('ingreso a la ruta api/Randoms')
    let random = Math.random();
    random = Math.trunc(random * 100 + 1);
    res.send(`${random}`)
})

//x números random del 1 al 1000
router.get(`/:number`, (req, res) => {
    logger.warn('ingreso a la ruta api/Randoms/number')
    const cant = req.params.number;
    const result = fork(`./functions/numberRandoms.js`)
    result.send(cant)
    result.on('message', data => {
        res.send(`${data}`)
    })
})

export default router;