import {Router} from 'express';
import passport from 'passport';
import {logInfo} from '../loggers/logger.js';

import { sendUserRegisterEmail } from '../config/nodemailer.js';

const adminEmail = 'huertagonzalo@hotmail.com';

const router = Router();

router.get('/', (req, res)=>{
    res.status(500).json({ message: "Error en el registro" });
});

router.post('/', passport.authenticate('register',{
    failureRedirect: '/api/register',
}),
(req, res)=>{
    logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
    sendUserRegisterEmail(adminEmail, req.body);
    res.status(201).json({
        message: "Usuario registrado con éxito",
        id: req.user._id,
        email: req.user.email,
    });
});

export default router;