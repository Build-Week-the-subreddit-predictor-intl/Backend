const db = require("../../database/db-config");

async function getAllPosts(limit, sortby, sortdir) {
	return db("posts")
		.orderBy(sortby || "id", sortdir || "asc")
		.limit(limit || "25");
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
