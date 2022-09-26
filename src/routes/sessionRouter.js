import {Router} from 'express';
import {isAuth} from '../utils/isAuth.js';
import { getUserSessionId, getUserById } from '../controllers/sessionControllers.js';

const router = Router();

router.get('/', isAuth, getUserSessionId);

router.get('/:id', getUserById);

export default router;