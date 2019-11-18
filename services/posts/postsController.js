const {
	getAllPosts,
	createPost,
	getPostById,
	editPost,
	deletePost
} = require("./postsModel");

const fetchAllPosts = (req, res) => {
	const { limit, sortBy, sortDir } = req.query;
	getAllPosts(limit, sortBy, sortDir)
		.then(posts => {
			res.status(200).json(posts);
		})
		.catch(err => {
			res.status(400).json({
				message:
					"Unable to process request for all posts because " + err.message
			});
		});
};

const fetchPostById = (req, res) => {
	const { id } = req.params;
	createPost(id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(err => {
			res.status(400).json({
				error: `Unable to process request for post ${id} 
        information because ${err.message}`
			});
		});
};

const makePost = (req, res) => {
	const post = req.body;
	insert(post)
		.then(() => {
			res.status(201).json({
				message: `Succefully posted ${post.title} ${post.text}`
			});
		})
		.catch(err => {
			res.status(400).json({
				message: `Unable to process request to create post because
        ${err.message}`
			});
		});
};

const updatePost = (req, res) => {
	const { id } = req.params;
	const post = req.body;

	update(id, post)
		.then(() => {
			res.status(200).json({
				message: `Succefully updated post ${id} with ${post.title} ${post.text}`
			});
		})
		.catch(err => {
			res.status(400).json({
				message: `Unable to process request to update post ${id} because
        ${err.message}`
			});
		});
};

const removePost = (req, res) => {
	const { id } = req.params;
	remove(id)
		.then(() => {
			res.status(200).json({
				message: `Post ${id} was succesfully removed`
			});
		})
		.catch(err => {
			res.status(400).json({
				error: `Unable to process removal because of ${err.message}`
			});
		});
};

module.exports = {
	fetchAllPosts,
	fetchPostById,
	makePost,
	updatePost,
	removePost
};
