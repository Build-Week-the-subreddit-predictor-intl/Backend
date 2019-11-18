require("dotenv").config();
const { adminpw } = require("../../config/index");
const bcrypt = require("bcryptjs");
exports.seed = function(knex) {
	return knex("users")
		.truncate()
		.then(function() {
			return knex("users").insert([
				{ username: "admin", password: bcrypt.hashSync(adminpw, 11) }
			]);
		});
};
