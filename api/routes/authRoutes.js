import express from 'express';
import validator, { validators } from '../middlewares/validator.js';

import { authController } from '../controllers/index.js';

const router = express.Router();

router.post(
  '/auth/login',
  validator(validators.authValidator.loginBodySchema, 'body'),
  authController.login
);

export default router;
