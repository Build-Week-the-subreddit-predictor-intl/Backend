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

function getSubreddit(filter) {
  return db("subreddits").where(filter).first();
}

function createSubreddit(name) {
  return db("subreddits").insert({ subreddit_name: name }).then(ids => getSubreddit({ id: ids[0] }));
}

function createPostSuggestion(post_id, subreddit_id) {
  return db("post_suggestion").insert({ post_id, subreddit_id }).first();
}

module.exports = {
	getAllPosts,
	createPost,
	getPostById,
	editPost,
  deletePost,
  getSubreddit,
  createSubreddit,
  createPostSuggestion
};
