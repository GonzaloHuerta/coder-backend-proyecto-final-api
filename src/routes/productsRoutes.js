import {Router} from 'express';
import {checkIfIsAdmin, getAllProducts, getProductById, addProduct, editProductById, deleteProduct} from '../controllers/productController.js';
import {isAuth} from '../utils/isAuth.js';

const router = Router();

router.get('/', isAuth, getAllProducts);
router.get('/:id', getProductById);
router.post('/', checkIfIsAdmin, addProduct);
router.put('/:id', checkIfIsAdmin, editProductById);
router.delete('/:id', checkIfIsAdmin, deleteProduct);

export default router;