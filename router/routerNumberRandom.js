const express = require("express");
const { fork } = require("child_process")
const router = express.Router();

//1 número random del 1 al 100
router.get(`/`, (req, res) => {
    let random = Math.random();
    random = Math.trunc(random * 100 + 1);
    res.send(`${random}`)
})

//x números random del 1 al 1000
router.get(`/:number`, (req, res) => {
    const cant = req.params.number;
    const result = fork(`./functions/numberRandoms.js`)
    result.send(cant)
    result.on('message', data => {
        res.send(`${data}`)
    })
})

module.exports = router;