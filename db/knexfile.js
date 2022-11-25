'use strict';

const config = require('../config');

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'knex',
      user: 'knex',
      password: 'knex'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },
  production: {
    client: 'pg',
    version: config.audit.pg.version,
    connection: {
      host: config.audit.host,
      user: config.audit.user,
      password: config.audit.password,
      database: config.audit.database
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
