import db from '../config/database.js';
1;
import actividadQueries from '../queries/actividadQueries.js';

const createActividad = async (req, res) => {
  try {
    const actividad = await db('actividad').insert(req.body);
    res.json({
      msg: 'Actividad creada',
      status: 200,
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
      status: 500,
      error: JSON.stringify(error),
    });
  }
};

const getAllActividads = async (req, res) => {
  try {
    const actividades = await db('actividad').select('*').where(req.query);
    return res.json({
      msg: 'Actividads obtenidas',
      data: { actividades },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener actividades',
      error,
      status: 500,
    });
  }
};

const getActividad = async (req, res) => {
  return res.status(400).json({
    msg: 'Usa la ruta de /actividades con filtros en el body',
    status: 200,
    data: [],
  });
};

const updateActividad = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!id) {
    return res.status(401).json({
      msg: 'Id required',
      status: 400,
    });
  }
  try {
    const newActividad = await db('actividad').where({ id }).update(body);
    return res.json({
      msg: 'Actividad actualizada',
      data: {
        actividad: newActividad,
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar actividad',
      error,
      status: 500,
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
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al borrar actividad',
      error,
      status: 500,
    });
  }
};

const getActividadesConInstructores = async (_, res) => {
  try {
    const actividades = await db.raw(
      actividadQueries.getActividadesConInstructores
    );
    return res.json({
      status: 200,
      msg: 'Actividades encontradas',
      data: {
        actividades: actividades[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar actividades con instructores',
      error,
      status: 500,
    });
  }
};

const getActividadesSinInstructores = async (_, res) => {
  try {
    const actividades = await db.raw(
      actividadQueries.getActividadesSinInstructores
    );

    return res.json({
      status: 200,
      msg: 'Actividades encontradas',
      data: {
        actividades: actividades[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar actividades sin instructores',
      error,
      status: 500,
    });
  }
};

const getActividadesSinSuplente = async (_, res) => {
  try {
    const actividades = await db.raw(
      actividadQueries.getActividadesSinSuplente
    );
    return res.json({
      status: 200,
      msg: 'Actividades encontradas',
      data: {
        actividades: actividades[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar actividades sin suplente',
      error,
      status: 500,
    });
  }
};

const getActividadesConCupoNoInscritas = async (req, res) => {
  try {
    const actividades = await db.raw(
      actividadQueries.getActividadesConCupoNoInscritas,
      req.persona.id
    );
    return res.json({
      status: 200,
      data: actividades[0],
      msg: 'Datos encontrados',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar act con cupo no inscritas',
      status: 500,
      error,
    });
  }
};

const getActividadesInscritasSocio = async (req, res) => {
  try {
    const actividades = await db.raw(
      actividadQueries.getActividadesInscritasSocio,
      [req.persona.id, req.persona.id]
    );
    return res.json({
      status: 200,
      data: actividades[0],
      msg: 'Datos encontrados',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al buscar act con cupo no inscritas',
      status: 500,
      error,
    });
  }
};

const inscribirActividadSocio = async (req, res) => {
  try {
    const idsDia = [];
    const idsHorario = [];
    const horariosActividades = (
      await db.raw(actividadQueries.getHorariosActividad, req.body.actividadId)
    )[0];

    horariosActividades.forEach((element) => {
      idsDia.push(element.id_dia);
      idsHorario.push(element.id_horario);
    });

    const hoursMatched = (
      await db.raw(actividadQueries.getTraslapes, [
        req.persona.id,
        idsDia,
        idsHorario,
      ])
    )[0];

    if (hoursMatched.length > 0) {
      return res.status(400).json({
        msg: 'Hay traslape en una actividad inscrita',
        status: 400,
        error: 'Error',
      });
    } else {
      const registered = await db('socio_actividad').insert({
        id_actividad: req.body.actividadId,
        id_socio: req.persona.id,
      });
      return res.status(200).json({
        msg: 'Hay traslape en una actividad inscrita',
        status: 200,
        data: {
          actividad: registered[0],
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: 'Error 💀',
      status: 500,
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
  getActividadesConInstructores,
  getActividadesSinInstructores,
  getActividadesSinSuplente,
  getActividadesConCupoNoInscritas,
  getActividadesInscritasSocio,
  inscribirActividadSocio,
};
