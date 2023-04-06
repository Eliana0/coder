import { User } from "../models/User.js"
import { passwordHash } from "../functions/crypt.js"

class userContent {
    constructor() {
        this.use =  User
    }

    addLogin = async(mail) => {
        try{
            let user = await this.use.findOne({ mail }).exec()
            return user
        }catch(err){console.log(err)}
    }

    newUser = async(name, mail, password, adress, age, number, img) => {
        try{
            let pass= password;
            let user = new User({
                password: passwordHash(pass),
                mail: mail,
                name: name,
                adress: adress, 
                age: age,
                number: number,
                img: img
            })
            return user
        }catch(err){console.log(err)}
    }
}

export default userContent