import express from 'express';
import { pagoController } from '../controllers/index.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/pagos', auth, pagoController.createPago);
router.get('/pagos', auth, pagoController.getAllPagos);

router.get('/pagos/:id', auth, pagoController.getPago);

router.put('/pagos/:id', auth, pagoController.updatePago);

router.delete('/pagos/:id', auth, pagoController.deletePago);

export default router;
