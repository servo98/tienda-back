import jwt from 'jwt-simple';
import config from '../config/index.js';
import db from '../config/database.js';

const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const persona = (
      await db('persona').select('*').where({ correo, password })
    )[0];
    if (!persona) {
      return res.status(400).json({
        status: 400,
        msg: 'Datos incorrectos',
        error: 'Datos incorrectos',
      });
    }

    delete persona.password;
    const token = jwt.encode(persona, config.auth.secret);
    return res.json({
      msg: 'Login correcto',
      data: {
        token,
        persona,
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar usuario',
      error: JSON.stringify(error),
      status: 500,
    });
  }
};

export { login };
