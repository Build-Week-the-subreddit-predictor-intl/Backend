const request = require("supertest");
const {
	getAllPosts,
	getAllPostsWithSuggestions,
	createPost,
	getPostById,
	editPost,
	deletePost,
	getPostSuggestions
} = require("../postsModel");
const { addUser } = require("../../auth/authModel");
const db = require("../../../database/db-config");

let postList = [];
const post = { user_id: 1, title: "title", text: "text" };
const user = { username: "test", password: "test" };

beforeEach(async () => {
	await db("posts").truncate()
	return await db("users").truncate();
});
afterEach(async () => {
	await db("posts").truncate();
	return await db("users").truncate();
});

describe("create post", () => {
	it("should insert post", async () => {
		await addUser(user);
		await createPost(post);
		postList = await db("posts");
		expect(postList).toHaveLength(1);
	});
});
describe("get all posts", () => {
	it("get posts", async () => {
		await addUser(user);
		await createPost(post);
		postList = await getAllPosts(1);
		expect(postList).toHaveLength(1);
	});
});
describe("get all posts with suggestions", () => {
	it("get posts with suggestions", async () => {
		await addUser(user);
		await createPost(post);
		postList = await getAllPostsWithSuggestions(1);
		expect(postList).toHaveLength(1);
		
	});
});
describe("get all posts with suggestions", () => {
	it("get posts with suggestions", async () => {
		await addUser(user);
		await createPost(post);
		postList = await getPostSuggestions(1);
		expect(postList).toHaveLength(0);
	});
});
describe("get post by id", () => {
	it("get post by id", async () => {
		await addUser(user);
		await createPost(post);
		postList = await getPostById(1);
		expect(postList == "object");
	});
});
describe("edit post", () => {
	it("edit post", async () => {
		await addUser(user);
		await createPost(post);
		postList = await editPost(1, { text: "text2", ...post });
		expect(postList == "object");
	});
});
describe("delete post", () => {
	it("delete post", async () => {
		await addUser(user);
		await createPost(post);
		postList = await deletePost(1);
		expect(postList == 1);
	});
});
