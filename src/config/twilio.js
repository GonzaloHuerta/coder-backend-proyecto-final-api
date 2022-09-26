import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const twilioAccount = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendSms = (to)=>{
    try {
        twilioAccount.messages.create({
            body: 'Su pedido ha sido recibido. Se encuentra en proceso',
            from: '+15618234814',
            to: to
        })
        console.log('SMS enviado')
    } catch (error) {
        console.log(error)
    }
}

const sendWhatsapp = (to, userData)=>{
    try {
        twilioAccount.messages.create({
            body: `Nuevo pedido de ${userData.nombre} ${userData.apellido} <${userData.email}>`,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:${to}`
        })
        console.log('WPP enviado')
    } catch (error) {
        console.log(error)
    }
}

export {sendSms, sendWhatsapp};