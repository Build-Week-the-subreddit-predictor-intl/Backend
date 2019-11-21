exports.up = function(knex) {
  return knex.schema.table('users', () => {});
};
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('token');
};