import express from "express";
import core from "os"
import compression from 'compression'
import createLogger from "../functions/logger.js"

const router = express.Router();
const logger = createLogger('PROD')

compression()

const carpetaDelProyecto = `Carpeta del proyecto: ${process.cwd()}`
const processId = `Process Id: ${process.pid}`
const versionNode = `Version de node: ${process.version}`
const sistemaOperativo = `Sistema operativo: ${process.platform}`
const rutaDeEjecución = `Path de ejecución: ${process.execPath}`
const memoria = `Memoria reservada: ${process.memoryUsage()}`
const procesadores = `Cantidad de procesadores: ${core.cpus().length}`

console.log(process.cwd())

router.get('/', (req, res) => {
    logger.warn('ingreso a la ruta /info')
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