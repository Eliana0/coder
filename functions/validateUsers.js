import { User } from '../models/User.js'
import { passwordHash } from '../crypt.js'
import createLogger from "../functions/logger.js"
import mongoose from 'mongoose'

const logger = createLogger('PROD')

const validateUsers = (req, res, next) => {
    const {name, mail, password} = req.body
    if((name).length < 5){
        logger.error('Se necesita un usuario son mas de 5 caracteres')
    }else{
        logger.warn('Se registró un nuevo usuario')
        let pass= password;
        let user = new User({
            password: passwordHash(pass),
            mail: mail,
            name: name
        })
        user.save((err, docs) => {
            if(err) {
                res.redirect('/singup')
            }else{
                mongoose.user = docs
                res.redirect('/out')
            }
        })
    }next()
}

export default validateUsers;