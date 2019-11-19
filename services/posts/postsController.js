const {
	getAllPosts,
	createPost,
	getPostById,
	editPost,
	deletePost,
	getPostSuggestions
} = require("./postsModel");


// const fetchAllUserPosts = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;
// 		let allPosts = await getAllPosts(id);
// 		Promise.all(allPosts.map(post => getPostSuggestions(post.id))).then(
// 			allSuggestions => {
// 				allPosts = allPosts.map((post, i) => ({
// 					...post,
// 					suggestions: allSuggestions[i]
// 				}));
// 				res.status(200).json(allPosts);
// 			}
// 		);
// 	} catch (error) {
// 		next({ message: error });
// 	}
// };

const fetchAllUserPosts = (req, res)=>{
	const {id} = req.params;
	getAllPosts(id)
	.then(user=>{
		res.status(200).json(user)
	})
	.catch(err=>{
		res.status(400).json({message: `unable to fetch user ${id} because ${err.message}`})
	})
}

const fetchPostById = (req, res) => {
	const { id } = req.params;

	getPostById(id)
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
	createPost(post)
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

	editPost(id, post)
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
	deletePost(id)
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
	fetchAllUserPosts,
	fetchPostById,
	makePost,
	updatePost,
	removePost
};
