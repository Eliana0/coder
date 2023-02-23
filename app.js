import routerLogin from "./router/routerLogin.js"
import routerLogout from "./router/routerLogout.js"
import routerSingup from "./router/routerSingup.js"
/* import routerOut from "./router/routerOut.js"
import routerInfo from "./router/routerInfo.js"
import routerNumberRandom from "./router/routerNumberRandom.js"
import express from "express"
import session from "express-session"
import MongoStore from 'connect-mongo'
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 8080
const app = express()

app.listen(PORT, ()=> console.log(`hola ` + PORT)) */

/* function ports(){
    let PORT = 8080
    if(process.argv[2] === 'CLUSTER'){
        
    }else if(process.argv[2] === 'FORK'){

    }else{
        app.listen(PORT, ()=> console.log(`hola ` + PORT))
    }
}

ports() */

/* app.use(express.urlencoded({extended:true}))
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
app.use('/api/randoms', routerNumberRandom) */

/* import express from "express"

const app = express()

app.listen(8081, () => console.log(`Worker Process ${process.pid}`))

app.get('/Holis', (req, res) => {
    res.send(`Hols Mundo`)
}) */

import express from "express"
import cluster from 'cluster'
import core from "os"

const app = express()

if(cluster.isPrimary){
console.log(`Primary process ${process.pid}`)
for(let i=0; i<(core.cpus().length); i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code) => {
        console.log(`worker ${worker.process.pid} fué eliminado con ${code}`)
        cluster.fork()
    })
}else{
    app.listen(8080, () => console.log(`Worker Process ${process.pid}`))
}
