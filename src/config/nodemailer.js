import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let emailClient = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth:{
        user: process.env.GMAIL_SMTP_EMAIL,
        pass: process.env.GMAIL_SMTP_PASS
    },
    tls : { rejectUnauthorized: false }
});

const sendUserRegisterEmail = async(to, user)=>{
    try {
        emailClient.sendMail({
            from: `"CoderShop"<gonzaloahuerta@gmail.com>`,
            to: to,
            subject: "Nuevo usuario registrado",
            text: ``,
            html: `
            <p>Hola admin,</p>
            <br/>
            <p>Se ha registrado un usuario con los siguientes datos:</p> 
            <br/>
            <p>Nombre: ${user.nombre}</p>
            <p>Apellido: ${user.apellido}</p>
            <p>Direccion: ${user.direccion}</p>
            <p>Edad: ${user.edad}</p>
            <p>Email: ${user.email}</p>
            <p>Teléfono: ${user.telefono}</p>
            <br />
            <p>Saludos!</p>
            
            `
        })
        console.log("Email enviado")
    } catch (error) {
        console.log(error)
    }
}

const sendNewOrderEmail = async(to, user, data)=>{
    try {
        emailClient.sendMail({
            from: `"CoderShop"<gonzaloahuerta@gmail.com>`,
            to: to,
            subject: `Nuevo pedido de ${user.nombre} ${user.apellido} <${user.email}>`,
            html: `
            <p>Hola admin,</p>
            <br/>
            <p>Se ha recibido una nueva orden con los siguientes productos:</p> 
            <br/>
            ${data.map((item)=>{
                return "<p>Producto: " + item._id.nombre + " | Cantidad: " + item.cantidad  + "<p>"
            })}
            `
        })
        console.log("Email enviado")
    } catch (error) {
        console.log(error)
    }
}




export {sendUserRegisterEmail, sendNewOrderEmail};