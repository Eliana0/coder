/* const productosApi = require(`./router/router.js`)
const productosRandom = require(`./router/fake.route.js`) */
const User = require('./models/User.js')
const express = require("express")
const cookieParser = require("cookie-parser")
const session = require("express-session")
const FileStore = require("session-file-store")

const PORT = process.env.PORT || 8080
const Store = FileStore(session)
const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    key: "user_sid",
    secret: "c0d3r",
    resave: true,
    saveUninitialized: true
}))

app.listen(8080, ()=> console.log(`hola ` + PORT))

/* app.use('/productos', productosApi)
app.use('/api/productos-test', productosRandom) */

/* app.listen(app.get("port"), () => {
    console.log("hola " + PORT)
}) */

const sessionChecker = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/dashboard')
    }else{
        next()
    }
}

app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})

app.route('/login').get((req, res) => {
    res.sendFile(__dirname + '/public/login.html')
})

app.route('/singup').get(sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/public/singup.html')
})/* .post(req, res) */



/* app.use(session({
    store: new Store({
        path: "./session",
        ttl: 900,
    }),
    secret: "c0d3r",
    resave: true,
    saveUninitialized: true,
}))

app.get('/', (req, res) => {
    req.session.user = {
        username: "eliana",
        role: "admin"
    }
    res.send({ message: 'ok' })
})

app.get('/currentUser', (req, res) => {
    res.send(req.session.user)
}) */



/* app.get('/set-cookie', (req, res) => {
    res.cookie('cristaldo', 'holis jajaj').send({message: "ola ke ase"})
})
app.get('/get-cookie', (req, res) => {
    res.send(req.cookies)
})
app.get('/clear', (req, res) => {
    res.clearCookie('cristaldo').send({message: "Cookie borrada"})
})
app.get('/clear/:nombre', (req, res) => {
    const { nombre } = req.params
    res.clearCookie(nombre).send({message: "Cookie borrada"})
}) */