import express from 'express';
import { personaController } from '../controllers/index.js';

const router = express.Router();

router.post('/personas', personaController.createPersona);

router.get('/personas', personaController.getAllPersonas);

router.get('/personas/:id', personaController.getPersona);

router.put('/personas/:id', personaController.updatePersona);

router.delete('/personas/:id', personaController.deletePersona);

export default router;
