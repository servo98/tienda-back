import knex from 'knex';

import config from './index.js';

export default knex({
  client: 'mysql',
  connection: config.database,
});
