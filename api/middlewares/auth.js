import config from '../config/index.js';
import jwt from 'jwt-simple';
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      status: 400,
      msg: 'Falta cabecera de authorization',
      error: 'Login inválido',
    });
  }
  try {
    const decoded = jwt.decode(token, config.auth.secret);
    if (decoded.id) {
      req.persona = decoded;
      next();
    } else {
      return res.status(400).json({
        msg: 'Login incorrecto',
        error: 'Login incorrecto',
        status: 400,
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: 'Login incorrecto',
      error: 'Contraseña inválida',
      status: 400,
    });
  }
};

export { auth };
