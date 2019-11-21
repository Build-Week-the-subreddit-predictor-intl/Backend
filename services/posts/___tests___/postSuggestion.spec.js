const request = require("supertest");
const {
	createPostSuggestion,
	createSubreddit,
	createPost
} = require("../postsModel");
const { addUser } = require("../../auth/authModel");
const db = require("../../../database/db-config");

const user = { username: "test", password: "test" };
const post = { user_id: 1, title: "title", text: "text" };
const subreddit = "name5";
let suggestionList = [];


beforeEach(async () => {
	 db("post_suggestion").truncate();
	 db("subreddits").truncate();
	 db("posts").truncate();
	return  await db("users").truncate();
});


afterEach(async () => {
	 db("post_suggestion").truncate();
	 db("subreddits").truncate();
	 db("posts").truncate();
	return await db("users").truncate();
});


describe("create suggestion", () => {
	it("create suggestion", async () => {
		createSubreddit(subreddit);
			addUser(user);
		 createPost(post);
		 createPostSuggestion(1, 1);
		// suggestionList = db("post_suggestion");
		expect(suggestionList).toHaveLength(0);
	});
});
