import {Router} from 'express';
import passport from 'passport';
import {logInfo} from '../loggers/logger.js';

const router = Router();

router.get('/', (req, res)=>{
    res.status(500).json({ message: "Error en el login" });
});

router.post('/', passport.authenticate('login', {
    failureRedirect: '/api/login',
}),
(req, res)=>{
    logInfo.info(`Ruta: ${req.path} | Método ${req.method}`);
    res.status(200).json({
        message: "Usuario logueado con éxito",
        id: req.user._id,
        email: req.user.email,
    })
}); 

export default router;