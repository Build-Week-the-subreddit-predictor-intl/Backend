exports.up = function(knex) {
  return knex.schema.createTable('users', users => {
    users.increments();
    users.string('username', 100).unique().notNullable();
    users.string('password', 100).notNullable();
    users.string("access_token").unique();
		users.string("refresh_token").unique();
		users.string("token_type", 20);
		users.bigInteger("expires_in");
		users.string("scope", 50);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};