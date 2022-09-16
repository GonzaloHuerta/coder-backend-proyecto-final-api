import {Router} from 'express';
import passport from 'passport';
import {logError, logInfo} from '../loggers/logger.js';
import { renderHome } from '../controllers/homeController.js';
import { loginController } from '../controllers/loginController.js';
import { renderErrorLogin } from '../controllers/errorLoginController.js';
import { logoutController } from '../controllers/logoutController.js';
import { registerController } from '../controllers/registerController.js';
import { renderErrorRegister } from '../controllers/errorRegisterController.js';

const router = Router();

//login
router.get('/login', (req, res)=>{
    res.status(500).json({ message: "Error en el login" });
});
router.post('/login', loginController);

//logout
router.get('/logout', logoutController);

//register
router.get('/register', (req, res)=>{
    res.status(500).json({ message: "Error en el registro" });
});
router.post('/register', registerController);

export default router;
