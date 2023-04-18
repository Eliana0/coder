import { User } from "../models/User.js"
import { passwordHash } from "../functions/crypt.js"
import { SyncMapInstance } from "twilio/lib/rest/preview/sync/service/syncMap.js"

class userContent {
    constructor() {
        this.use = User
    }

    addLogin = async(mail) => {
        try{
            let user = await this.use.findOne({ mail }).exec()
            return user
        }catch(err){console.log(err)}
    }
    findId = async(user_sid) => {
        try{
            let user = await this.use.findById({ _id }).exec()
            return user
        }catch(err){console.log(err)}
    }
    newUser = async(name, mail, password, adress, age, number, img) => {
        try{
            let pass= password;
            let user = new this.use({
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
    update = async(_id, productos) => {
        try{
            await this.products.findByIdAndUpdate(_id, { productos: productos })
            return actualiza
        }catch(err){return err}
    }
    deleteUser = async( mail ) => {
        let borrar = await this.use.findOneAndDelete({ mail }).exec()
        return borrar
    }
}

export default userContent