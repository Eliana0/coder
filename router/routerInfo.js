import express from "express";
import core from "os"
const router = express.Router();


const carpetaDelProyecto = `Carpeta del proyecto: ${process.cwd()}`
const processId = `Process Id: ${process.pid}`
const versionNode = `Version de node: ${process.version}`
const sistemaOperativo = `Sistema operativo: ${process.platform}`
const rutaDeEjecución = `Path de ejecución: ${process.execPath}`
const memoria = `Memoria reservada: ${process.memoryUsage()}`
const procesadores = `Cantidad de procesadores: ${core.cpus().length}`

console.log(process.cwd())

router.get('/', (req, res) => {
    res.send(`${carpetaDelProyecto}<br>
              ${processId}<br>
              ${rutaDeEjecución}<br>
              ${versionNode}<br>
              ${memoria}<br>
              ${sistemaOperativo}<br>
              ${procesadores}
              `)
})


export default router;