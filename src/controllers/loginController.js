import {logInfo} from '../loggers/logger.js';
import passport from 'passport';

export const loginController = ()=>{
    passport.authenticate('login', {
        failureRedirect: '/api/login',
    }),
    (req, res)=>{
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
        res.status(200).json({
            message: "Usuario logueado con éxito",
            id: req.user._id,
            email: req.user.email,
        });
    }
}