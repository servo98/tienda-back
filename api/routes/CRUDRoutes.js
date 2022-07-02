import express from 'express';
import { creteCRUDController } from '../controllers/index.js';

const createRoutes = (singular, plural) => {
  const crudController = creteCRUDController(singular, plural);

  const router = express.Router();

  router.post(`/${plural}`, crudController.create);

  router.get(`/${plural}`, crudController.getAll);

  router.get(`/${plural}/:id`, crudController.getById);

  router.put(`/${plural}/:id`, crudController.update);

  router.delete(`/${plural}/:id`, crudController.delete);

  return router;
};

export default createRoutes;
