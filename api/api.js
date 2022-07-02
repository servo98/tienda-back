import express from 'express';
import {
  personaRoutes,
  actividadesRoutes,
  authRoutes,
  pagoRoutes,
  createRoutes,
} from './routes/index.js';

const api = express();

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/status', (_, res) => {
  return res.json({
    msg: 'API Funcionando',
  });
});

api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

api.use(personaRoutes);
api.use(actividadesRoutes);
api.use(authRoutes);
api.use(pagoRoutes);

api.use((err, req, res, nex) => {
  return res.status(500).json({
    msg: 'Error general',
    status: 500,
    error: err,
  });
});

export default api;
