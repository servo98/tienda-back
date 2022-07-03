import joi from 'joi';
import errorMessages from '../config/errorMessages.js';

/**
 *
 * @param {joi.Schema} schema
 * @returns
 */
const withValidation = (schema, object) => async (req, res, next) => {
  try {
    const options = {
      errors: {
        labels: false,
        language: 'es',
      },
      messages: {
        es: { ...errorMessages },
      },
    };
    const response = await schema.validateAsync(req[object], options);
    req[object] = response;
    console.log(response);
    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      msg: 'Body incorrecto',
      error: error,
    });
  }
};

export default withValidation;

export { default as validators } from './valitators/index.js';
