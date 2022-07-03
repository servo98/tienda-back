import db from '../config/database.js';

const createPago = async (req, res) => {
  try {
    const pago = await db('pago').insert(req.body);
    res.json({
      msg: 'Pago creada',
      status: 200,
      data: {
        pago: {
          ...req.body,
          id: pago[0],
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Eror al crear pago',
      status: 500,
      error: JSON.stringify(error),
    });
  }
};

const getAllPagos = async (req, res) => {
  if (req.persona.id_rol != 1) {
    req.query.id_persona = req.persona.id;
  }
  try {
    //const pagos = await db('pago').select('*').where(req.query)
    //knex.raw(`*, 'Patrol' as "$type"`
    const pagos = await db('pago')
    .join('persona','persona.id','pago.id_persona')
    .select('persona.nombre', 'pago.*')
    .where(req.query)
    
    return res.json({
      msg: 'Pagos obtenidas',
      data: { pagos },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al obtener pagos',
      error,
      status: 500,
    });
  }
};

const updatePago = async (req, res) => {
  const { id } = req.params;
  const { pago } = req.body;
  try {
    let pagos = [];
    await db('pago')
      .where({ id })
      .update({
        ...pago,
        fecha_pago: pago.id_estado == 2 ? new Date() : undefined,
      });
    pagos.push(id);
    const actualizado = (await db('pago').select('*').where({ id }))[0];
    if (actualizado.id_tipo > 1 && req.body.continuar) {
      delete actualizado.id;
      delete actualizado.fecha_pago;
      const today = new Date();
      const final = new Date();
      final.setMonth(today.getMonth() + 1);
      const newPago = (
        await db('pago').insert({
          ...actualizado,
          id_estado: 1,
          periodo_inicial: today,
          periodo_final: final,
          fecha_corte: final,
        })
      )[0];
      pagos.push(newPago);
    }
    return res.json({
      msg: 'Pago actualizada',
      data: {
        pagos,
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar pago',
      error: error.message,
      status: 500,
    });
  }
};

const deletePago = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db('pago').where({ id }).del();
    return res.json({
      msg: 'Pago eliminada',
      data: {
        pago: deleted,
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al borrar pago',
      error,
      status: 500,
    });
  }
};

export { createPago, getAllPagos, updatePago, deletePago };
