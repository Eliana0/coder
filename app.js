import routerLogin from "./router/routerLogin.js"
import routerLogout from "./router/routerLogout.js"
import routerSingup from "./router/routerSingup.js"
import routerOut from "./router/routerOut.js"
import express from "express"
import session from "express-session"
import MongoStore from 'connect-mongo'
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 8080
const app = express()

app.listen(8080, ()=> console.log(`hola ` + PORT))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({ mongoUrl: "mongodb://localhost:27017/sessions" }),
    key: "user_sid",
    secret: "c0d3r",
    resave: true,
    saveUninitialized: true
}))

app.use('/login', routerLogin)
app.use('/logout', routerLogout)
app.use('/singup', routerSingup)
app.use('/out', routerOut)