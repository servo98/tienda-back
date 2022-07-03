import joi from 'joi';

const loginBodySchema = joi.object({
  correo: joi
    .string()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .required(),
  password: joi.string().required(),
});

export { loginBodySchema };
