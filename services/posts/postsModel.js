const db = require("../../database/db-config");

function getAllPosts(id) {
	return db("posts").where("user_id", "=", id);
}

function getPostSuggestions(id) {
	return db("post_suggestion as ps")
		.join("posts as p", "p.id", "ps.post_id")
		.join("subreddits as s", "s.id", "ps.subreddit_id")
		.where("post_id", "=", id)
		.select('s.subreddit_name');
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
	deletePost,
	getPostSuggestions
};
