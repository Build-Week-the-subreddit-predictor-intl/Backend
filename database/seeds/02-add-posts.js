exports.seed = function(knex) {
	return knex("posts").truncate()
		.then(function() {
			return knex("posts").insert([
				{ id: 1, user_id: 1, title: "rowValue1", text: 'text1' },
				{ id: 2, user_id: 1, title: "rowValue2", text: 'text2' },
				{ id: 3, user_id: 1, title: "rowValue3", text: 'text3' }
			]);
		});
};
