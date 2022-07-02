import db from '../config/database.js';

const createPersona = async (req, res) => {
  try {
    const persona = await db('persona').insert(req.body);
    let pago;
    //Si es socio
    if (req.body.id_rol == 3) {
      const pagoBody = {
        id_persona: persona[0],
        fecha_pago: new Date(),
        id_tipo: 1,
        monto: 300,
        id_estado: 2,
      };
      pago = await db('pago').insert(pagoBody);
    }
    res.json({
      msg: 'Persona creada',
      data: {
        persona: {
          ...req.body,
          id: persona[0],
        },
        pago: pago ? pago[0] : null,
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Eror al crear persona',
      error,
      status: 500,
    });
  }
};

const getAllPersonas = async (req, res) => {
  try {
    const personas = await db('persona').select('*').where(req.query);
    return res.json({
      msg: 'Personas obtenidas',
      data: { personas },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener personas',
      error,
      status: 500,
    });
  }
};

const getPersona = async (req, res) => {
  return res.status(400).json({
    msg: 'Usa la ruta de /personas con filtros en el body',
    status: 200,
    data: [],
  });
};

const updatePersona = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!id) {
    return res.status(400).json({
      msg: 'Id required',
      status: 400,
      error: 'id required',
    });
  }
  try {
    const newPersona = await db('persona').where({ id }).update(body);
    return res.json({
      msg: 'Persona actualizada',
      data: {
        persona: newPersona,
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar persona',
      error,
      status: 500,
    });
  }
};

const deletePersona = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db('persona').where({ id }).del();
    return res.json({
      msg: 'Persona eliminada',
      data: {
        persona: deleted,
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al borrar persona',
      error,
      status: 500,
    });
  }
};

export {
  createPersona,
  getAllPersonas,
  getPersona,
  updatePersona,
  deletePersona,
};
