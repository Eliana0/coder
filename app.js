import routerLogin from "./router/routerLogin.js"
import routerLogout from "./router/routerLogin.js"
import routerSingup from "./router/routerSingup.js"
import routerOut from "./router/routerOut.js"
import express from "express"
import session from "express-session"
import FileStore from "session-file-store"
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 8080
const Store = FileStore(session)
const app = express()

app.listen(8080, ()=> console.log(`hola ` + PORT))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
let baseSession = session({
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/sessions'}),
    key: "user_sid",
    secret: 'c0d3r',
    resave: true,
    saveUninitialized: true
})
app.use(session({
    store: new Store({
        ttl: 400,
        path: './sessions'
    }),
    key: "user_sid",
    secret: "c0d3r",
    cookie: {maxAge: 8000},
    resave: true,
    saveUninitialized: true
}))

app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/singup', routerSingup)
app.use('/out', routerOut)