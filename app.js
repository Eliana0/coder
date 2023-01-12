const express = require("express")
const productosApi = require(`./router/router.js`)
const productosRandom = require(`./router/fake.route.js`)
const app = express()
const PORT = process.env.PORT || 8080
const servidor = app.listen(8080, ()=> console.log(`hola ` + PORT))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/productos', productosApi)
app.use('/api/productos-test', productosRandom)