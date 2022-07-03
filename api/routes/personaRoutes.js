import express from 'express';
import { personaController } from '../controllers/index.js';
import { auth, permisos } from '../middlewares/auth.js';
import validator, { validators } from '../middlewares/validator.js';

const router = express.Router();
const { personaValidator } = validators;

router.post(
  '/personas',
  auth,
  permisos([1]),
  validator(personaValidator.createPersonaBodySchema, 'body'),
  personaController.createPersona
);

router.get(
  '/personas',
  auth,
  permisos([1]),
  validator(personaValidator.getAllPersonasQuerySchema, 'query'),
  personaController.getAllPersonas
);

router.put(
  '/personas/:id',
  auth,
  permisos([1, 2, 3]),
  validator(personaValidator.updatePersonaBodySchema, 'body'),
  personaController.updatePersona
);

router.delete(
  '/personas/:id',
  auth,
  permisos([1]),
  personaController.deletePersona
);

export default router;
