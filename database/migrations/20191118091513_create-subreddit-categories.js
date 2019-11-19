
exports.up = function(knex) {
  return knex.schema.createTable("subreddits", table => {
		table.increments();
		table.string("subreddit_name").unique().notNullable();
	});
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("subreddits")
};
