import express from 'express';
import {
  personaRoutes,
  actividadesRoutes,
  authRoutes,
  CRUDRoutes,
} from './routes/index.js';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/status', (req, res) => {
  return res.json({
    msg: 'API Funcionando',
  });
});

const routes = [
  {
    singular: 'persona',
    plural: 'personas',
  },
  {
    singular: 'actividade',
    plural: 'actividades',
  },
];

api.use(personaRoutes);
api.use(actividadesRoutes);
api.use(authRoutes);

export default api;
