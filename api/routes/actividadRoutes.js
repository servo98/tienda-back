import express from 'express';
import { actividadController } from '../controllers/index.js';
import { actividadValidator } from '../middlewares/valitators/index.js';
import validator from '../middlewares/validator.js';
import { auth, permisos } from '../middlewares/auth.js';

const router = express.Router();

router.get(
  '/getActividadesConInstructores',
  actividadController.getActividadesConInstructores
);

router.post(
  '/actividades',
  auth,
  permisos([1]),
  validator(actividadValidator.createActividadBodySchema, 'body'),
  actividadController.createActividad
);
router.get('/actividades', actividadController.getAllActividads);
router.put(
  '/actividades/:id',
  auth,
  permisos([1]),
  actividadController.updateActividad
);
router.delete(
  '/actividades/:id',
  auth,
  permisos([1]),
  actividadController.deleteActividad
);
router.get(
  '/getActividadesSinInstructores',
  auth,
  permisos([1, 2]),
  actividadController.getActividadesSinInstructores
);

router.get(
  '/getActividadesSinSuplente',
  auth,
  permisos([1, 2]),
  actividadController.getActividadesSinSuplente
);

router.get(
  '/getActividadesConCupoNoInscritas',
  auth,
  permisos([3]),
  actividadController.getActividadesConCupoNoInscritas
);

router.get(
  '/getActividadesInscritasSocio',
  auth,
  permisos([3]),
  actividadController.getActividadesInscritasSocio
);

router.get(
  '/getActividadesInscritasInstructor',
  auth,
  permisos([2]),
  actividadController.getActividadesInscritasInstructor
);

router.post(
  '/inscribirActividadSocio',
  auth,
  validator(actividadValidator.inscribirActividadBodySchema, 'body'),
  permisos([3]),
  actividadController.inscribirActividadSocio
);

router.put(
  '/inscribirActividadInstructor',
  auth,
  permisos([2]),
  validator(actividadValidator.inscribirActividadBodySchema, 'body'),
  actividadController.inscribirActividadInstructor
);

router.delete(
  '/bajaActividadSocio/:id_actividad',
  auth,
  permisos([3]),
  actividadController.bajaActividadSocio
);

router.put(
  '/bajaActividadInstructor/:id_actividad',
  auth,
  permisos([2]),
  actividadController.bajaActividadInstructor
);

export default router;
