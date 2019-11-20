const request = require("supertest");
const { getSubreddit, createSubreddit } = require("../postsModel");
const db = require("../../../database/db-config");

let subredditList = [];
const subreddit = "name";


beforeEach(() => {
	return db("subreddits").truncate();
});

describe("subreddits models", () => {
	describe("create subreddit", () => {
		it("create subreddit", async () => {
			await createSubreddit(subreddit);
			subredditList = await db("subreddits");
			expect(subredditList).toHaveLength(1);
		});
	});
	describe("get subreddit", () => {
		it("get subreddit", async () => {
			await createSubreddit(subreddit);
			subredditList = await getSubreddit({ subreddit_name: "name" });
			expect(subredditList == 'object');
		});
	});
});
