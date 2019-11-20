const db = require("../../database/db-config");

function getAllPosts(id) {
	return db("posts").where("user_id", "=", id);
}

function getAllPostsWithSuggestions(id) {
  return db("posts as p")
    .leftJoin("post_suggestion as ps", "ps.post_id", "p.id")
    .leftJoin("subreddits as sr", "sr.id", "ps.subreddit_id")
    .where({ user_id: id })
    .select('p.*', 'sr.subreddit_name', 'ps.subreddit_id')
    .orderBy('ps.post_id');
}

function getPostSuggestions(id) {
	return db("post_suggestion as ps")
		.join("posts as p", "p.id", "ps.post_id")
		.join("subreddits as s", "s.id", "ps.subreddit_id")
		.where("post_id", "=", id)
		.select('s.subreddit_name');
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
  return db("post_suggestion").insert({ post_id, subreddit_id }, '*');
}

module.exports = {
  getAllPosts,
  getAllPostsWithSuggestions,
	createPost,
	getPostById,
	editPost,
	deletePost,
  getPostSuggestions,
  getSubreddit,
  createSubreddit,
  createPostSuggestion,
};
