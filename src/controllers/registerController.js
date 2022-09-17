import {logInfo} from '../loggers/logger.js';
import passport from 'passport';
import '../../src/passport/local.js';

export const registerController = ()=>{
    return(
        passport.authenticate('register',{
            failureRedirect: '/',
        }),
        (req, res)=>{
            logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
            res.status(201).json({
                message: "Usuario registrado con éxito",
                id: req.user._id,
                email: req.user.email,
            });
        }
    )
}