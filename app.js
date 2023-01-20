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


const checkUser = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/dashboard')
    }else{
        next()
    }
}

app.get('/', checkUser, (req, res) => {
    res.redirect('/login')
})

app.route('/login').get((req, res) => {
    res.sendFile(__dirname + '/public/login.html')
}).post((req, res) => {
    let user = new User({
        name: req.body.name
    })
    user.save((err, docs) => {
        if(err) {
            res.redirect('/login')
        }else{
            req.session.user = docs,
            res.redirect('/singup')
        }
    })
})

app.route('/singup').get((req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.sendFile(__dirname + '/public/singup.html')
    }else{
        res.redirect('/login')
    }
})