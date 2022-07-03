import joi from 'joi';

const createActividadBodySchema = joi.object({
  costo: joi.number().precision(2).required(),
  cupo_disponible: joi.number().integer().required(),
  cupo_maximo: joi.number().integer().required(),
  id_instructor: joi.number().integer().optional(),
  id_suplente: joi.number().integer().optional(),
  id_tipo: joi.number().integer().required(),
});

const updateActividadBodySchema = joi.object({
  costo: joi.number().precision(2).optional(),
  cupo_disponible: joi.number().integer().optional(),
  cupo_maximo: joi.number().integer().optional(),
  id_instructor: joi.number().integer().optional(),
  id_suplente: joi.number().integer().optional(),
  id_tipo: joi.number().integer().optional(),
});

const inscribirActividadBodySchema = joi.object({
  actividadId: joi.number().integer().required(),
});

export {
  createActividadBodySchema,
  updateActividadBodySchema,
  inscribirActividadBodySchema,
};
