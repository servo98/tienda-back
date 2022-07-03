import express from 'express';
import { pagoController } from '../controllers/index.js';
import { auth, permisos } from '../middlewares/auth.js';
import validator, { validators } from '../middlewares/validator.js';

const router = express.Router();
const { pagoValidator } = validators;

router.post(
  '/pagos',
  auth,
  permisos([1]),
  validator(pagoValidator.createPagoBodySchema, 'body'),
  pagoController.createPago
);
router.get(
  '/pagos',
  auth,
  permisos([1, 3]),
  validator(pagoValidator.getAllPagosQuerySchema, 'query'),
  pagoController.getAllPagos
);
router.put(
  '/pagos/:id',
  auth,
  permisos([1]),
  validator(pagoValidator.updatePagoBodySchema, 'body'),
  pagoController.updatePago
);
router.delete('/pagos/:id', auth, permisos([1]), pagoController.deletePago);

export default router;
