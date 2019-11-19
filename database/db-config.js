const knex = require("knex");
const config = require('../knexfile');
const env = require('../config').env

module.exports = knex(config[env]);