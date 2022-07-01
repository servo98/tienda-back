import express from 'express';
import { actividadController } from '../controllers/index.js';

const router = express.Router();

router.post('/actividades', actividadController.createActividad);

router.get('/actividades', actividadController.getAllActividads);

router.get('/actividades/:id', actividadController.getActividad);

router.put('/actividades/:id', actividadController.updateActividad);

router.delete('/actividades/:id', actividadController.deleteActividad);

router.get(
  '/getActividadesConInstructores',
  actividadController.getActividadesConInstructores
);

export default router;
