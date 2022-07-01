import db from '../config/database.js';

const firstCap = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export default (singular, plural) => {
  const SINGLE_FIRST_CAP = firstCap(singular);
  const PLURAL_FIRST_CAP = firstCap(plural);
  return {
    [`create`]: async (req, res) => {
      try {
        const obj = await db(singular).insert(req.body);
        res.json({
          msg: `${SINGLE_FIRST_CAP} creada`,
          status: 200,
          data: {
            [singular]: {
              ...req.body,
              id: obj[0],
            },
          },
        });
      } catch (error) {
        return res.status(500).json({
          msg: `Error al crear ${singular}`,
          status: 500,
          error: JSON.stringify(error),
        });
      }
    },

    [`getAll`]: async (req, res) => {
      try {
        const objs = await db(singular).select('*').where(req.query);
        return res.json({
          msg: `${PLURAL_FIRST_CAP} obtenidas`,
          data: { [plural]: objs },
          status: 200,
        });
      } catch (error) {
        return res.status(500).json({
          msg: `Error al obtener ${plural}`,
          error,
          status: 500,
        });
      }
    },

    [`getById`]: async (_, res) => {
      return res.status(400).json({
        msg: `Usa la ruta de /${plural} con filtros en el body`,
        status: 200,
        data: [],
      });
    },

    [`update`]: async (req, res) => {
      const { id } = req.params;
      const { body } = req;
      try {
        const newObj = await db(singular).where({ id }).update(body);
        return res.json({
          msg: `${SINGLE_FIRST_CAP} updated`,
          data: {
            [singular]: newObj,
          },
          status: 200,
        });
      } catch (error) {
        return res.status(500).json({
          msg: `Error al actualizar ${singular}`,
          error,
          status: 500,
        });
      }
    },

    [`delete`]: async (req, res) => {
      const { id } = req.params;
      try {
        const deleted = await db(singular).where({ id }).del();
        return res.json({
          msg: `${SINGLE_FIRST_CAP} deleted`,
          data: {
            [singular]: deleted,
          },
          status: 200,
        });
      } catch (error) {
        return res.status(500).json({
          msg: `Error al borrar ${singular}`,
          error,
          status: 500,
        });
      }
    },
  };
};
