import express from 'express';
import { actividadController } from '../controllers/index.js';

const router = express.Router();

router.post('/actividades', personaController.createActividad);

router.get('/actividades', personaController.getAllActividads);

router.get('/actividades/:id', personaController.getActividad);

router.put('/actividades/:id', personaController.updateActividad);

router.delete('/actividades/:id', personaController.deleteActividad);

export default router;
