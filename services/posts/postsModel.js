const db = require("../../database/db-config");

async function getAllPosts() {
	return db("posts");
}

async function createPost(post) {
	return db("posts").insert(post);
}

async function getPostById(id) {
	return db("posts")
		.where({ id })
		.first();
}

async function editPost(id, post) {
	return db("posts")
		.where({ id })
		.update(post);
}

async function deletePost(id) {
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
