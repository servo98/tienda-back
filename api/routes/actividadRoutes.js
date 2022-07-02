import express from 'express';
import { actividadController } from '../controllers/index.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get(
  '/getActividadesConInstructores',
  actividadController.getActividadesConInstructores
);

router.post('/actividades', auth, actividadController.createActividad);
router.get('/actividades', auth, actividadController.getAllActividads);

router.get('/actividades/:id', auth, actividadController.getActividad);

router.put('/actividades/:id', auth, actividadController.updateActividad);

router.delete('/actividades/:id', auth, actividadController.deleteActividad);

router.get(
  '/getActividadesSinInstructores',
  auth,
  actividadController.getActividadesSinInstructores
);

router.get(
  '/getActividadesSinSuplente',
  auth,
  actividadController.getActividadesSinSuplente
);

router.get(
  '/getActividadesConCupoNoInscritas',
  auth,
  actividadController.getActividadesConCupoNoInscritas
);

router.get(
  '/getActividadesInscritasSocio',
  auth,
  actividadController.getActividadesInscritasSocio
);

router.post(
  '/inscribirActividadSocio',
  auth,
  actividadController.inscribirActividadSocio
);

router.put(
  '/inscribirActividadInstructor',
  auth,
  actividadController.inscribirActividadInstructor
);

router.delete(
  '/bajaActividadSocio/:id_actividad',
  auth,
  actividadController.bajaActividadSocio
);

router.put(
  '/bajaActividadInstructor/:id_actividad',
  auth,
  actividadController.bajaActividadInstructor
);

export default router;
