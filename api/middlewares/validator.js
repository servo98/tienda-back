import e from 'express';
import joi from 'joi';

/**
 *
 * @param {joi.Schema} schema
 * @returns
 */
const withValidation = (schema) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
  } catch (error) {
    return res.status(400).json({
      status: 400,
      msg: 'Body incorrecto',
      error: error.msg,
    });
  }
};

export default withValidation;
