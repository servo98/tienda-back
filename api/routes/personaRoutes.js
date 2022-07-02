import express from 'express';
import { personaController } from '../controllers/index.js';
import { auth, permisos } from '../middlewares/auth.js';

const router = express.Router();

router.post('/personas', auth, permisos([1]), personaController.createPersona);

router.get('/personas', auth, permisos([1]), personaController.getAllPersonas);

router.get('/personas/:id', auth, permisos([1]), personaController.getPersona);

router.put(
  '/personas/:id',
  auth,
  permisos([1, 2, 3]),
  personaController.updatePersona
);

router.delete(
  '/personas/:id',
  auth,
  permisos([1]),
  personaController.deletePersona
);

export default router;
