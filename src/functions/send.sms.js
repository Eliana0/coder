import twilio from 'twilio'

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN

const sms = async () => {
    const client = twilio(accountSid, authToken)
    
    try {
        const message = await client.messages.create({
            body: 'Hola soy un SMS desde Node.js',
            from: process.env.TWILIO_NUMBER_FROM,
            to: '+541140623043'
        })
        console.log(message)
    } catch (err){
        console.log(err)
    }
}

export default sms;