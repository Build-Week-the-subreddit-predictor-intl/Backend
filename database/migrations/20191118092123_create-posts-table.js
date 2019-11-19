exports.up = function(knex) {
	return knex.schema.createTable("posts", table => {
		table.increments();
		table
			.integer("user_id")
			.unsigned()
			.notNullable()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE");
		table.string("title").notNullable();
		table.string("text").notNullable();
		table.boolean("ad").defaultTo(false);
		table.string("flair_id", 36);
		table.string("flair_text", 64);
		table.boolean("nsfw").defaultTo(false);
		table.boolean("resubmit").defaultTo(false);
		table.boolean("sendreplies").defaultTo(false);
		table.boolean("spoiler").defaultTo(false);
		table.string("sr");
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("posts");
};
