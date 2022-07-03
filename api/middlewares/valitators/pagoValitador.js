import joi from 'joi';

const createPagoBodySchema = joi.object({
  fecha_corte: joi.date().optional(),
  fecha_pago: joi.date().optional(),
  id_estado: joi.number().integer().required(),
  id_persona: joi.number().integer().required(),
  id_tipo: joi.number().integer().required(),
  monto: joi.number().required(),
  periodo_inicial: joi.date().optional(),
  periodo_final: joi.date().optional(),
});

const getAllPagosQuerySchema = joi.object({
  correo: joi.string().optional(),
  fecha_corte: joi.date().optional(),
  fecha_pago: joi.date().optional(),
  id_estado: joi.string().integer().optional(),
  id_persona: joi.number().integer().optional(),
  id_tipo: joi.string().integer().optional(),
  monto: joi.number().optional(),
  periodo_inicial: joi.date().optional(),
  periodo_final: joi.date().optional(),
});

const updatePagoBodySchema = joi.object({
  pago: joi
    .object({
      fecha_corte: joi.date().optional(),
      fecha_pago: joi.date().optional(),
      id_estado: joi.number().integer().required(),
      id_persona: joi.number().integer().optional(),
      id_tipo: joi.number().integer().optional(),
      monto: joi.number().optional(),
      periodo_inicial: joi.date().optional(),
      periodo_final: joi.date().optional(),
    })
    .required(),
  continuar: joi.boolean().optional(),
});

export { createPagoBodySchema, getAllPagosQuerySchema, updatePagoBodySchema };
