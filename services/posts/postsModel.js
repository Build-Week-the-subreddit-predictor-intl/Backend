const db = require("../../database/db-config");

function getAllPosts(limit, sortby, sortdir) {
	return db("posts")
		.orderBy(sortby || "id", sortdir || "asc")
		.limit(limit || "25");
}

function createPost(post) {
	return db("posts").insert(post).then((ids) => getPostById(ids[0]));
}

function getPostById(id) {
	return db("posts")
		.where({ id })
		.first();
}

function editPost(id, post) {
	return db("posts")
		.where({ id })
    .update(post)
    .then(() => getPostById(id));
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
