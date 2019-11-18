exports.up = function(knex) {
	return knex.schema.createTable("tokens", table => {
		table.increments();
		table.string("token").unique().notNullable();
	});
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("tokens")
};
