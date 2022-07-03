import joi from 'joi';

const createPersonaBodySchema = joi.object({
  correo: joi
    .string()
    .max(70)
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  id_rol: joi.number().integer().required(),
  nombre: joi.string().max(70).required(),
  password: joi.string().max(50).required(),
  telefono: joi.string().regex(/^\d+$/).max(12).required(),
});

const getAllPersonasQuerySchema = joi.object({
  correo: joi.string().optional(),
  id_rol: joi.number().integer().optional(),
  nombre: joi.string().optional(),
  telefono: joi.string().optional(),
});

const updatePersonaBodySchema = joi.object({
  correo: joi
    .string()
    .max(70)
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .optional(),
  id_rol: joi.number().integer().optional(),
  nombre: joi.string().max(70).optional(),
  passsword: joi.string().max(50).optional(),
  telefono: joi.string().regex(/^\d+$/).max(12).optional(),
});

export {
  createPersonaBodySchema,
  getAllPersonasQuerySchema,
  updatePersonaBodySchema,
};
