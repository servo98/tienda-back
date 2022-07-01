import db from '../config/database.js';

const createActividad = async (req, res) => {
  try {
    const actividad = await db('actividad').insert(req.body);
    res.json({
      msg: 'Actividad creada',
      data: {
        actividad: {
          ...req.body,
          id: actividad[0],
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Eror al crear actividad',
      error: JSON.stringify(error),
      body: req.body,
    });
  }
};

const getAllActividads = async (req, res) => {
  try {
    const actividades = await db('actividad').select('*').where(req.query);
    return res.json({
      msg: 'Actividads obtenidas',
      data: { actividades },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener actividades',
      error,
    });
  }
};

const getActividad = async (req, res) => {
  return res.status(400).json({
    msg: 'Usa la ruta de /actividades con filtros en el body',
  });
};

const updateActividad = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!id) {
    return res.status(401).json({
      msg: 'Id required',
    });
  }
  try {
    const newActividad = await db('actividad').where({ id }).update(body);
    return res.json({
      msg: 'Actividad actualizada',
      data: {
        actividad: newActividad,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar actividad',
      error,
    });
  }
};

const deleteActividad = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db('actividad').where({ id }).del();
    return res.json({
      msg: 'Actividad eliminada',
      data: {
        actividad: deleted,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al borrar actividad',
      error,
    });
  }
};

export {
  createActividad,
  getAllActividads,
  getActividad,
  updateActividad,
  deleteActividad,
};
