const request = require("supertest");
const {
	createPostSuggestion,
	createSubreddit,
	createPost
} = require("../postsModel");
const { addUser } = require("../../auth/authModel");
const db = require("../../../database/db-config");

let suggestionList = [];
const subreddit = "name5";
const post = { user_id: 1, title: "title", text: "text" };
const user = { username: "test", password: "test" };

beforeEach(async () => {
	await db("post_suggestion").truncate();
	await db("subreddits").truncate();
	await db("posts").truncate();
	return await db("users").truncate();
});

afterEach(async () => {
	await db("post_suggestion").truncate();
	await db("subreddits").truncate();
	await db("posts").truncate();
	return await db("users").truncate();
});

describe("create suggestion", () => {
	it("create suggestion", async () => {
		await addUser(user);
		await createPost(post);
		await createSubreddit(subreddit);
		await createPostSuggestion(1, 1);
		suggestionList = await db("post_suggestion");
		expect(suggestionList).toHaveLength(1);
	});
});
