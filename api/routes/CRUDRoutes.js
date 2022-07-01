import express from 'express';
import { actividadController } from '../controllers/index.js';

const createRoutes = (singular, plural) => {
  const router = express.Router();

  router.post(`/${plural}`, actividadController.createActividad);

  router.get(`/${plural}`, actividadController.getAllActividads);

  router.get(`/${plural}/:id`, actividadController.getActividad);

  router.put(`/${plural}/:id`, actividadController.updateActividad);

  router.delete(`/${plural}/:id`, actividadController.deleteActividad);

  return router;
};

export default createRoutes;
