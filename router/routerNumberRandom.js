import express from "express";
import { fork } from "child_process"
const router = express.Router();

//1 número random del 1 al 100
router.get(`/`, (req, res) => {
    let random = Math.random();
    random = Math.trunc(random * 100 + 1);
    res.send(`${random}`)
})

//100 números random del 1 al 10000
router.get(`/number`, (req, res) => {
    const result = fork(`functions/numberRandom`)
    result.on('message', data => {
        res.send(`${data}`)
    })
})

export default router;