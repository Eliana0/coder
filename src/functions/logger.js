import winston from 'winston'

//env:
//PROD = Graba información específica a documentos
//ENV = Pasa toda información por consola

const createLogger = (env) => {
    if(env === 'PROD'){
        return winston.createLogger({
            transports: [
                new winston.transports.File({ filename: './src/router/files/warn.log', level: 'warn' }),
                new winston.transports.File({ filename: './src/router/files/error.log', level: 'error' })
            ]
        })
    }else {
        return winston.createLogger({
            transports: [
                new winston.transports.Console({ level: 'info' })
            ]
        })
    }
}

export default createLogger