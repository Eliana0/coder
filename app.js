import routerProducts from './router/routerProducts.js';
import routerCarrito from './router/routerCart.js';
import routerLogin from "./router/routerLogin.js"
import routerLogout from "./router/routerLogout.js"
import routerSingup from "./router/routerSingup.js"
import routerOut from "./router/routerOut.js"
import routerInfo from "./router/routerInfo.js"
import routerNumberRandom from "./router/routerNumberRandom.js"
import ports from "./functions/ejecuciónPort.js"
import express from "express"
import session from "express-session"
import MongoStore from 'connect-mongo'
import cookieParser from "cookie-parser"
import compression from 'compression'

const app = express()

compression()
ports(app) 

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017" }),
    key: "user_sid",
    secret: "c0d3r",
    resave: true,
    saveUninitialized: true
}))


app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/singup', routerSingup)
app.use('/out', routerOut)
app.use('/info', routerInfo)
app.use('/api/randoms', routerNumberRandom)
app.use('/products', routerProducts)
app.use('/cart', routerCarrito)
