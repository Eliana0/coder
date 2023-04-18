import { createTransport } from "nodemailer"

const TEST_MAIL = process.env.TEST_MAIL

    function email (nombre, RES_MAIL){
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
        to: RES_MAIL,
        subject: `Gracias por registrarte ${nombre}`,
        html: '<p>Su usuario ha sido registrado exitosamente</p>'
    }
    
    try{
        const info = transporter.sendMail(mailOptions)
        console.log(info)
    } catch (err) {
        console.log(err)
    }
}

export default email