export default class usersDTO {
    constructor(user) {
        this.name = `${user.name} ${user.mail}`
        this.img = user.img
    }
}