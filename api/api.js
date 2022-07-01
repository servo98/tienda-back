import express from 'express';
import { personaRoutes } from './routes/index.js';

const api = express();

api.use(express.json());
app.use(express.urlencoded({ extended: true }));

api.get('/status', (req, res) => {
  return res.json({
    msg: 'API Funcionando',
  });
});

api.use(personaRoutes);

export default api;
