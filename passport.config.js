/* import passport from 'passport'
import local from 'passport-local'
import { passwordHash, hashOut } from './crypt.js';
import { User } from './models/User.js'

const LocalSrtategy = local.Strategy;
export const initializePassport = () => {
    passport.use(
        'register',
        new LocalSrtategy(
            {passReqToCallback: true},
            async (req, done, password, mail) => {
                try {
                    let userMail = await User.findOne({ mail })
                    if(userMail) return done(null, false)
                    const newUser = {
                        password: passwordHash(password),
                        mail,
                        name: req.body.name,
                        mail: req.body.mail,
                        password: req.body.password
                }
                try{
                    let result = await User.create(newUser)
                    return done(null, result)
                }catch(err){done(err)}
            }catch(err){done(err)}
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id, done)
    })
    passport.use(
        'login',
        new LocalSrtategy(
            async(name, password, done) => {
                try{
                    let users = await User.findOne({ name })
                    if(!users) return done(null, false)
                    if(!hashOut) return done(null, false)
                    return done(null, users)
                }catch(err){
                    done(err)
                }
            }
        )
    )
} */

import passport from 'passport'
import local from 'passport-local'
import { User } from './models/User.js'
import { passwordHash, hashOut } from './crypt.js'

const LocalStrategy = local.Strategy

export const initializePassport = () => {
    passport.use(
        'register',
        new LocalStrategy(
            { passReqToCallback: true },
            async (req, name, password, done) => {
                try {
                    let user = await User.findOne({ name })
                    if (user) return done(null, false) //error, data
                    const newUser = {
                        name,
                        password: passwordHash(password),
                        mail: req.body.mail,
                        name: req.body.name
                    }
                    try {
                        let result = await User.create(newUser)
                        return done(null, result)
                    } catch(err) { 
                        done(err)
                    }
                } catch(err) {
                    done(err)
                }
            })
        )
        passport.serializeUser((user, done) => {
            done(null, user._id)
        })
        passport.deserializeUser((id, done) => {
            User.findById(id, done)
        })

    passport.use(
        'login',
        new LocalStrategy(
            async(name, password, done) => {
                try {
                    let user = await User.findOne({ name })
                    if (!user) return done(null, false)
                    if (!hashOut(user, password)) return done(null, false)
                    return done(null, user)
                } catch(err) {
                    done(err)
                }
            }
        )
    )
}