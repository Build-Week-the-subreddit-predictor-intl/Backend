// Update with your config settings.
const { pgdburl } = require('./config').pgdburl
module.exports = {
	development: {
		client: "sqlite3",
		connection: {
			filename: "./database/subredditpredictor.db3"
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			}
		},
		useNullAsDefault: true,
		migrations: {
			directory: "./database/migrations"
		},
		seeds: {
			directory: "./database/seeds"
		}
	},

	testing: {
		client: "sqlite3",
		connection: {
			filename: "./database/subredditpredictor_testing.db3"
		},
		useNullAsDefault: true,
		migrations: {
			directory: "./database/migrations"
		},
		seeds: {
			directory: "./database/seeds"
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run("PRAGMA foreign_keys = ON", done);
			}
		}
	},

	production: {
		client: "pg",
		connection: pgdburl,
		migrations: {
			directory: "./database/migrations"
		},
		seeds: {
			directory: "./database/seeds"
		}
	}
};
