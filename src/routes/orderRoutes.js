import { Router } from 'express';
import { sendNewOrderEmail } from '../config/nodemailer.js';
import { sendSms, sendWhatsapp } from '../config/twilio.js';

const orderRouter = Router();

const adminEmail = 'huertagonzalo@hotmail.com';
const adminWhatsapp = '+5491160531457'

orderRouter.post('/', (req, res)=>{
    const productos = req.body.productos;
    const userData = req.body.userData;
    try {
        sendNewOrderEmail(adminEmail, userData, productos);
        sendSms(userData.telefono);
        sendWhatsapp(adminWhatsapp, userData)
        console.log('Pedido enviado!')
    } catch (error) {
        console.log(error);
    }
})

export default orderRouter;