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
    store: new Store({
        ttl: 60
    }),
    key: "user_sid",
    secret: "c0d3r",
    cookie: {maxAge: 60000},
    resave: true,
    saveUninitialized: true
}))

app.listen(8080, ()=> console.log(`hola ` + PORT))

/* app.use('/productos', productosApi)
app.use('/api/productos-test', productosRandom) */

const sessionChecher = (req, res, next) => {
    if(req.session.user && req.cookies.user_sid){
        res.redirect('/out')
    }else{
        next()
    }
}

app.get('/', sessionChecher, (req, res) => {
    res.redirect('/login')
})

app.route('/login').get((req, res) => {
    res.sendFile(__dirname + '/public/login.html')
}).post(async (req, res) => {
    let {name} = req.body
    try{
        let user = await User.findOne({ name }).exec()
        if(!user){
            res.redirect('/login') 
        } else{
            req.session.user = user
            res.redirect('/out')
        }
    }catch(err){console.log(err)}
})

app.route('/singup').get(sessionChecher, (req, res) => {
    res.sendFile(__dirname + '/public/singup.html')
}).post(async (req, res) => {
    let user = new User({
        name: req.body.name
    })
        user.save((err, docs) => {
            if(err) {
                res.redirect('/singup')
            }else{
                req.session.user = docs
                res.redirect('/out')
            }
    })
})

app.get('/logout', (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        let usuario = req.body.name
        res.clearCookie('user_sid')
        res.send(`Hasta luego ${usuario}`)
        res.redirect('/')
    }else{
        res.redirect('/login')
    }
})

app.get('/out', (req, res) => {
    if(req.session.user && req.cookies.user_sid){
        res.sendFile(__dirname + '/public/out.html')
    }else{
        res.redirect('/login')
    }
})