const request = require("supertest");
const { createPostSuggestion, createSubreddit, createPost } = require("../postsModel");
const db = require("../../../database/db-config");

let suggestionList = [];
const subreddit = "name5";
const post = { user_id: 1, title: "title", text: "text" };


beforeEach(() => {
	return db("post_suggestion").truncate();
});

describe("suggestion models", () => {
	describe("create suggestion", () => {
		it("create suggestion", async () => {
      await createPost(post)
      await createSubreddit(subreddit)
			await createPostSuggestion(2, 2);
			suggestionList = await db("post_suggestion");
			expect(suggestionList).toHaveLength(1);
		});
	});
});
