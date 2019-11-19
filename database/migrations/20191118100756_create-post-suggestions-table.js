exports.up = function(knex) {
	return knex.schema.createTable("post_suggestion", table => {
		table.increments();
		table
			.integer("subreddit_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("subreddits")
			.onDelete("CASCADE");
		table
			.integer("post_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("posts")
			.onDelete("CASCADE");
	});
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("post_suggestion");
};
