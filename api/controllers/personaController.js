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

const getPersona = async (req, res) => {
  return res.status(400).json({
    msg: 'Usa la ruta de /personas con filtros en el body',
  });
};

const updatePersona = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!id) {
    return res.status(401).json({
      msg: 'Id required',
    });
  }
  try {
    const newPersona = await db('persona').where({ id }).update(body);
    return res.json({
      msg: 'Persona actualizada',
      data: {
        persona: newPersona,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar persona',
      error,
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
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al borrar persona',
      error,
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
