import express from 'express';
import {
  authValidator,
  loginBodySwagger,
} from '../middlewares/valitators/index.js';
import validator from '../middlewares/validator.js';

import { authController } from '../controllers/index.js';

const router = express.Router();

export const swLoginRouter = {
  '/auth/login': {
    post: {
      ...loginBodySwagger,
    },
  },
};

router.post(
  '/auth/login',
  validator(authValidator.loginBodySchema, 'body'),
  authController.login
);

export default router;
