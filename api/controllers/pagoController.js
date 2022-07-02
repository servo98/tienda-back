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
  try {
    const pagos = await db('pago').select('*').where(req.query);
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

const getPago = async (req, res) => {
  return res.status(400).json({
    msg: 'Usa la ruta de /pagos con filtros en el body',
    status: 200,
    data: [],
  });
};

const updatePago = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (!id) {
    return res.status(401).json({
      msg: 'Id required',
      status: 400,
    });
  }
  try {
    const newPago = await db('pago').where({ id }).update(body);
    return res.json({
      msg: 'Pago actualizada',
      data: {
        pago: newPago,
      },
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Error al actualizar pago',
      error,
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

export { createPago, getAllPagos, getPago, updatePago, deletePago };
