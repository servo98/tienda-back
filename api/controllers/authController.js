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
    if(persona.id_rol == 3){
        const deudas = (
        await db('pago').select('id').where({ 
        id_persona: persona.id,
        id_estado: 1,
      }).andWhere(
        'fecha_corte',
        '<',
        new Date(),
      ));

      if(deudas.length > 0){
        return res.status(400).json({
          msg: 'El socio tiene pagos pendientes, pase a ventanilla',
          error: 'El socio tiene pagos pendientes, pase a ventanilla',
          status: 400,
        });
      }
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
