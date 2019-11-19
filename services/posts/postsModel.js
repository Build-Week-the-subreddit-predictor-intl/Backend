const db = require("../../database/db-config");

function getAllPosts(id) {
	return db("posts").where("user_id", "=", id);
}

function getPostSuggestions(id) {
	return db("post_suggestion as ps")
		.join("posts as p", "p.id", "ps.post_id")
		.join("subreddits as s", "s.id", "ps.subreddit_id")
		.where("post_id", "=", id);
}

function createPost(post) {
	return db("posts").insert(post, '*');
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
  return db("subreddits").insert({ subreddit_name: name }, 'id').then(ids => getSubreddit({ id: ids[0] }));
}

function createPostSuggestion(post_id, subreddit_id) {
  return db("post_suggestion").insert({ post_id, subreddit_id }, '*').first();
}

module.exports = {
	getAllPosts,
	createPost,
	getPostById,
	editPost,
  deletePost,
  getSubreddit,
  createSubreddit,
  createPostSuggestion,
  getPostSuggestions
};
