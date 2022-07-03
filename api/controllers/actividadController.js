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

const getAllActividads = async (_, res) => {
  try {
    const actividades = (
      await db.raw(actividadQueries.getAllPopulatedActivities)
    )[0];
    return res.json({
      msg: 'Actividads obtenidas',
      data: {
        actividades: actividades.map((actividad) => ({
          ...actividad,
          horario: actividad.horario.split(','),
        })),
      },
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

const getActividadPopulatedById = async (req, res) => {
  try {
    const actividadObtenida = (
      await db.raw(actividadQueries.getActividadPopulatedById, [req.params.id])
    )[0][0];
    return res.json({
      msg: 'Actividad obtenida',
      data: {
          actividad: actividadObtenida,
          horarios: actividadObtenida.horario.split(','),
        
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener la actividad',
      error: error.message,
      status: 500,
    });
  }
};

const updateActividad = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
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

const getActividadesInscritasInstructor = async (req, res) => {
  try {
    const actividades = await db.raw(
      actividadQueries.getActividadesInscritasInstructor,
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

const getActividadesInscritasSocio = async (req, res) => {
  try {
    const actividades = await db.raw(
      actividadQueries.getActividadesInscritasSocio,
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
      await db('actividad')
      .update({
        'cupo_disponible':
          'cupo_disponible - 1',
      }).where({
        id_actividad,
      });
      const actividadCosto = (
        await db('actividad').select('costo').where({
          id: req.body.actividadId,
        })
      )[0];

      let pago;
      //Si cuesta
      if (actividadCosto > 0) {
        const today = new Date();
        const final = new Date();
        final.setMonth(today.getMonth() + 1);

        const pagoBody = {
          id_persona: req.persona.id,
          fecha_pago: new Date(),
          id_tipo: 3,
          monto: actividadCosto,
          id_estado: 1,
          periodo_inicial: today,
          periodo_final: final,
          fecha_corte: final,
        };
        pago = await db('pago').insert(pagoBody);
      }
      return res.status(200).json({
        msg: 'Se inscribió exitosamente el socio',
        status: 200,
        data: {
          actividad: registered[0],
          pago,
        },
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: 'Error 💀',
      status: 500,
      error: error.message,
    });
  }
};

const inscribirActividadInstructor = async (req, res) => {
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
      await db.raw(actividadQueries.getTraslapesInstructores, [
        req.persona.id,
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
      const registered = await db('actividad')
        .update({
          [req.body.instructor ? 'id_instructor' : 'id_suplente']:
            req.persona.id,
        })
        .where({
          id: req.body.actividadId,
        });
      return res.status(200).json({
        msg: 'Actividad actualizada 👍',
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

const bajaActividadSocio = async (req, res) => {
  const { id_actividad } = req.params;
  try {
    const deleted = await db('socio_actividad')
      .where({ id_actividad, id_socio: req.persona.id })
      .del();
    await db('actividad')
    .update({
      'cupo_disponible':
        'cupo_disponible + 1',
    }).where({
      id_actividad,
    });
    return res.json({
      msg: 'Actividad dada de baja',
      status: 200,
      data: {
        actividad: deleted,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al dar de baja 💀',
      status: 500,
      error: error.message,
    });
  }
};

const bajaActividadInstructor = async (req, res) => {
  const { id_actividad } = req.params;
  const isInstuctor = req.body.instructor;
  const idtype = isInstuctor ? 'id_instructor' : 'id_suplente';
  try {
    const updated = await db('actividad')
      .where({
        id: id_actividad,
        [idtype]: req.persona.id,
      })
      .update({
        [idtype]: -1,
      });
    return res.json({
      msg: `${isInstuctor ? 'Instructor' : 'Suplente'} dado de baja`,
      status: 200,
      data: {
        actividad: updated,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al dar de baja 💀',
      status: 500,
      error: error.message,
    });
  }
};

export {
  createActividad,
  getAllActividads,
  updateActividad,
  deleteActividad,
  getActividadesConInstructores,
  getActividadesSinInstructores,
  getActividadesSinSuplente,
  getActividadesConCupoNoInscritas,
  getActividadesInscritasSocio,
  inscribirActividadSocio,
  inscribirActividadInstructor,
  bajaActividadSocio,
  bajaActividadInstructor,
  getActividadesInscritasInstructor,
  getActividadPopulatedById,
};
