import winston from 'winston'

//env:
//PROD = Graba información a documentos
//ENV = Pasa información por console

const createLogger = (env) => {
    if(env === 'PROD'){
        return winston.createLogger({
            transports: [
                new winston.transports.File({ filename: './router/files/warn.log', level: 'warn' }),
                new winston.transports.File({ filename: './router/files/error.log', level: 'error' })
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