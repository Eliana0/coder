//EJECUCIÓN
//forever => forever start app.js FORK/(CLUSTER nofund)
//           forever stop app.js
//pm2 => pm2 start app.js = FORK
//       pm2 start app.js -i número de instancias = CLUSTER
//       pm2 start app.js -i max
//       pm2 delete app.js
//       pm2 delete all app.js

function ports(app){
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
        app.listen(PORT, ()=> console.log(`Worker Process ${process.pid}`))
    }
}

export default ports