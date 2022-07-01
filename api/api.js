import express from 'express';
import { personaRoutes, actividadesRoutes } from './routes/index.js';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/status', (req, res) => {
  return res.json({
    msg: 'API Funcionando',
  });
});

api.use(personaRoutes);
api.use(actividadesRoutes);

export default api;
