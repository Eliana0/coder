const routerInfo = require("./router/routerInfo.js")
const routerNumberRandom = require("./router/routerNumberRandom.js")
const express = require("express")
const yargs = require("yargs")
const app = express()

yargs.version('1.0.0')


function ports(){
    let PORT = 8080
    if(process.argv[2] === undefined){
        app.listen(PORT, ()=> console.log(`hola ` + PORT))
    }else if(process.argv[2] === 'PORT'){

        yargs.command({
            command: 'PORT',
            describe: 'Escucha en el puerto',
            builder: {
                escucha: {
                    describe:'Describe puerto de escucha',
                    type: 'number'
                } 
            },
            handler: function(argv) {
                if(argv.escucha === 0){
                    app.listen(PORT, ()=> console.log(`hola ` + PORT))  
                }else{ //nodemon app.js PORT --escucha=número del puerto
                    app.listen(argv.escucha, ()=> console.log(`hola ` + argv.escucha))
                }
            }
        })
        }
    }

ports()
yargs.parse()
 
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/info', routerInfo)
app.use('/api/randoms', routerNumberRandom)