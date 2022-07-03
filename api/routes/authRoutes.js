import express from 'express';
import { authValidator } from '../middlewares/valitators/index.js';
import validator from '../middlewares/validator.js';

import { authController } from '../controllers/index.js';

const router = express.Router();

router.post(
  '/auth/login',
  validator(authValidator.loginBodySchema, 'body'),
  authController.login
);

export default router;
