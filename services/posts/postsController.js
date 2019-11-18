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
		.then(response => {
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

module.exports = {
	fetchAllPosts,
	fetchPostById,
	makePost,
	updatePost,
	removePost
};
