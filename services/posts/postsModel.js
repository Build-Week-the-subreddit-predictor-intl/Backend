const db = require("../../database/db-config");

function getAllPosts() {
	return db("posts");
}

function getPostSuggestions() {
	return db("post_suggestion").join('');
}

function createPost(post) {
	return db("posts").insert(post);
}

function getPostById(id) {
	return db("posts")
		.where({ id })
		.first();
}

function editPost(id, post) {
	return db("posts")
		.where({ id })
		.update(post);
}

function deletePost(id) {
	return db("posts")
		.where({ id })
		.del();
}

module.exports = {
	getAllPosts,
	createPost,
	getPostById,
	editPost,
	deletePost
};
