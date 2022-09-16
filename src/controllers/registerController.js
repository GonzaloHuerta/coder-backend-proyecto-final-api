import {logInfo} from '../loggers/logger.js';

export const registerController = ()=>{
    passport.authenticate('register',{
        failureRedirect: '/api/register',
    }),
    (req, res)=>{
        logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
        res.status(201).json({
            message: "Usuario registrado con éxito",
            id: req.user._id,
            email: req.user.email,
        });
    }
    
    if(req.user){
        res.redirect('/')
    }else{
        res.render('register');
    }
}