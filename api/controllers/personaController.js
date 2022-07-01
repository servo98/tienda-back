import db from '../config/database.js';

const createPersona = async (req, res) => {
  try {
    const persona = await db('persona').insert(req.body);
    res.json({
      msg: 'Persona creada',
      data: {
        persona: {
          ...req.body,
          id: persona[0],
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Eror al crear persona',
      error,
    });
  }
};

const getAllPersonas = async (req, res) => {
  try {
    const personas = await db('persona').select('*').where(req.query);
    return res.json({
      msg: 'Personas obtenidas',
      data: { personas },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener personas',
      error,
    });
  }
};

const getPersona = async (req, res) => {};

const updatePersona = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const newPersona = await db('persona').where({ id }).update(body);
    return res.json({
      msg: 'Persona actualizada',
      data: {
        persona: newPersona,
      },
    });
  } catch (error) {
    return res.status(500);
  }
};

const deletePersona = async (req, res) => {};

export {
  createPersona,
  getAllPersonas,
  getPersona,
  updatePersona,
  deletePersona,
};
