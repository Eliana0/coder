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

const PORT = process.env.PORT || 8080
const app = express()

//EJECUCIÓN
//forever => forever start app.js FORK/(CLUSTER nofund)
//           forever stop app.js
//pm2 => pm2 start app.js = FORK
//       pm2 start app.js -i número de instancias = CLUSTER
//       pm2 start app.js -i max
//       pm2 delete app.js
//       pm2 delete all app.js

ports(app) 

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
app.use('/info', routerInfo)
app.use('/api/randoms', routerNumberRandom)


