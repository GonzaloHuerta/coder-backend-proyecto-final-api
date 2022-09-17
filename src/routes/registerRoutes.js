import {Router} from 'express';
import passport from 'passport';
import {logInfo} from '../loggers/logger.js';

const router = Router();

router.get('/', (req, res)=>{
    res.status(500).json({ message: "Error en el registro" });
});

router.post('/', passport.authenticate('register',{
    failureRedirect: '/api/register',
}),
(req, res)=>{
    logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
    res.status(201).json({
        message: "Usuario registrado con éxito",
        id: req.user._id,
        email: req.user.email,
    });
});

export default router;