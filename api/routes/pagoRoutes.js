import express from 'express';
import { pagoController } from '../controllers/index.js';
import { auth, permisos } from '../middlewares/auth.js';

const router = express.Router();

router.post('/pagos', auth, permisos([1]), pagoController.createPago);
router.get('/pagos', auth, permisos([1, 3]), pagoController.getAllPagos);
router.put('/pagos/:id', auth, permisos([1]), pagoController.updatePago);
router.delete('/pagos/:id', auth, permisos([1]), pagoController.deletePago);

export default router;
