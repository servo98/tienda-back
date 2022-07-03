import express from 'express';
import swagger from './config/swagger.js';
import swaggerUi from 'swagger-ui-express';

import {
  personaRoutes,
  actividadesRoutes,
  authRoutes,
  pagoRoutes,
} from './routes/index.js';

const api = express();

// const { swagger, components } = j2s(mySchema, existingComponents);

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.get('/', (_, res) => {
  res.send('Bienvenido a la API DeGimnasio');
});

api.get('/status', (_, res) => {
  return res.json({
    msg: 'API Funcionando',
  });
});

api.use(personaRoutes);
api.use(actividadesRoutes);
api.use(authRoutes);
api.use(pagoRoutes);

api.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

api.use((err, _, res, __) => {
  if (err instanceof SyntaxError) {
    return res.status(500).json({
      msg: 'Json incorrecto',
      status: 400,
      error: err,
    });
  }
  return res.status(500).json({
    msg: 'Error general',
    status: 500,
  });
});

export default api;
