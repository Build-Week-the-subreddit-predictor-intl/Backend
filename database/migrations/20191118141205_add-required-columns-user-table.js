exports.up = function(knex) {
	return knex.schema.table("users", table => {
		table.string("access_token").unique();
		table.string("refresh_token").unique();
		table.string("token_type", 20).unique();
		table.bigInteger("expires_in");
		table.string("scope", 50);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists("users");
};
