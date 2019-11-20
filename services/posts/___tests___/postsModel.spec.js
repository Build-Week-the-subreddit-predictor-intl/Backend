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
const db = require("../../../database/db-config");

let postList = [];
const post = { user_id: 1, title: "title", text: "text" };

beforeEach(() => {
	return db("posts").truncate();
});

describe("post model", () => {
	describe("create post", () => {
		it("should insert post", async () => {
			await createPost(post);
			postList = await db("posts");
			expect(postList).toHaveLength(1);
		});
	});
	describe("get all posts", () => {
		it("get posts", async () => {
			await createPost(post);
			postList = await getAllPosts(1);
			expect(postList).toHaveLength(1);
		});
	});
	describe("get all posts with suggestions", () => {
		it("get posts with suggestions", async () => {
			await createPost(post);
			postList = await getAllPostsWithSuggestions(1);
			expect(postList).toHaveLength(1);
		});
	});
	describe("get all posts with suggestions", () => {
		it("get posts with suggestions", async () => {
			await createPost(post);
			postList = await getPostSuggestions(1);
			expect(postList).toHaveLength(0);
		});
	});
	describe("get post by id", () => {
		it("get post by id", async () => {
			await createPost(post);
			postList = await getPostById(1);
			expect(postList == 'object');
		});
	});
	describe("edit post", () => {
		it("edit post", async () => {
			await createPost(post);
			postList = await editPost(1,{text: 'text2', ...post});
			expect(postList == 'object');
		});
	});
	describe("delete post", () => {
		it("delete post", async () => {
			await createPost(post);
			postList = await deletePost(1);
			expect(postList == 1);
		});
	});
	
});


