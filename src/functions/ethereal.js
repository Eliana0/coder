import { createTransport } from "nodemailer"

const TEST_MAIL = process.env.TEST_MAIL
const RES_MAIL = 'elianamariacristaldo@gmail.com'

const mail = async () => {
    const transporter = createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: TEST_MAIL,
            pass: process.env.MAIL_PASSWORD
        }
    })
    
    const mailOptions = {
        form: TEST_MAIL,
        to: /* mongoose.user.mail */ RES_MAIL,
        subject: 'Mail de prueba desde Node.js',
        html: '<h1 style="color: blue;">Contenido de prueba desde Node.js<h1>'
    }
    
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (err) {
        console.log(err)
    }
}

export default mail;