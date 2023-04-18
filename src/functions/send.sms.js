import twilio from 'twilio'

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN

const sms = async (cart, user, precioTotal) => {
    const client = twilio(accountSid, authToken)
    
    try {
        const message = await client.messages.create({
            body: `Nuevo carrito ${cart} para ${user} Total: ${precioTotal}`,
            from: process.env.TWILIO_NUMBER_FROM,
            to: process.env.TWILIO_MY_NUMBER
        })
        console.log('mensaje enviado')
    } catch (err){
        console.log(err)
    }
}

export default sms;