import routerLogin from "./router/routerLogin.js"
import routerLogout from "./router/routerLogout.js"
import routerSingup from "./router/routerSingup.js"
import routerOut from "./router/routerOut.js"
import routerInfo from "./router/routerInfo.js"
import routerNumberRandom from "./router/routerNumberRandom.js"
import express from "express"
import session from "express-session"
import MongoStore from 'connect-mongo'
import cookieParser from "cookie-parser"
import cluster from 'cluster';
import core from "os"

const PORT = process.env.PORT || 8080
const app = express()

/* app.listen(PORT, ()=> console.log(`hola ` + PORT)) */

//EJECUCIÓN
//forever => forever start app.js FORK/(CLUSTER nofund)
//           forever stop app.js
//pm2 => pm2 start app.js = FORK
//       pm2 start app.js -i número de instancias = CLUSTER
//       pm2 delete app.js
//       pm2 delete all app.js

function ports(){
    let PORT = 8080
    //nodemon app.js CLUSTER
    if(process.argv[2] === 'CLUSTER'){
        if(cluster.isMaster){
            console.log(`Primary process ${process.pid}`)
            for(let i=0; i<(core.cpus().length); i++){
                cluster.fork();
            }
            cluster.on('exit', (worker, code) => {
            console.log(`worker ${worker.process.pid} fué eliminado con ${code}`)
            cluster.fork()
         })
    }//nodemon app.js FORK
    }else if(process.argv[2] === undefined || process.argv[2] === 'FORK'){
        //pm2 start app.js 1 proceso
        //pm2 start app.js -i cant
        app.listen(PORT, ()=> console.log(`Worker Process ${process.pid}`))

    }
}

ports() 


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


