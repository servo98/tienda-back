import express from 'express';
import { personaController } from '../controllers/index.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.post('/personas', auth, personaController.createPersona);

router.get('/personas', auth, personaController.getAllPersonas);

router.get('/personas/:id', auth, personaController.getPersona);

router.put('/personas/:id', auth, personaController.updatePersona);

router.delete('/personas/:id', auth, personaController.deletePersona);

export default router;
