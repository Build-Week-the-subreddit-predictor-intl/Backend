const axios = require('axios');
const {
	getAllPosts,
	createPost,
	getPostById,
	editPost,
	deletePost
} = require("./postsModel");

const fetchAllUserPosts = async (req, res, next) => {
  try {
    const id = req.loggedInUser.subject;
    const allPosts = await getAllPosts(id);
    Promise.all(allPosts.map(post => getPostSuggestions(post.id))).then((allSuggestions) => {
      allPosts = allPosts.map((post, i) => ({ ...post, suggestions: allSuggestions[i] }))
      res.status(200).json(allPosts);
    });
  } catch (error) {
    next({ message: error });
  }
};

const fetchPostById = (req, res, next) => {
	const id = req.loggedInUser.subject;
	getPostById(id)
		.then(post => {
			res.status(200).json(post);
		})
		.catch(err => next({ message: `Unable to process request for post information because ${err.message}`, status: 400 }));
};

const makePost = (req, res, next) => {
  const { title, text } = req.body; // will receive the form values for a new post
  const post = { 
    title, 
    text, 
    user_id: req.loggedInUser.subject
  };
  Promise.all([
    createPost(post), 
    axios.post(config.dataScienceModel, post)
  ]).then(async ([newPost, suggestions]) => {
    // will ask for subreddit suggestions 
    // will save the post
    if (!newPost || !newPost.id) {
      next({ message: "Could not insert post" });
      return;
    }
    if (!suggestions || !suggestions.data.length) { // respond with no suggestions :c
      res.status(404).json({ ...newPosts, suggestions: [] });
    } else { // if got suggestions
      // create auto insert and return id's function from subreddits table
      const allSuggestions = await createSubredditsIfNonExistent(suggestions.data, next);
      if (!allSuggestions || !allSuggestions.length) {
        next({ message: "Could not add suggestions!" });
      } else {
        // connect all suggestions with the post
        const connected = await connectPostToSuggestions(newPost.id, allSuggestions, next);
        if (!connected && !connected.length) {
          next({ message: "Could not connect post with suggested subreddits!" });
        } else {
          // send back the new post
          res.status(201).json({ ...newPost, suggestions: allSuggestions });
        }
      }
    }
  }).catch(next);
};

const createSubredditsIfNonExistent = (suggestions, next) => {
  try {
    let suggestionIds = [];
    suggestions.forEach(async (subreddit) => {
      let realSuggestion = await getSubreddit({ subreddit_name: subreddit });
      if(!realSuggestion || !realSuggestion.id) {
        realSuggestion = await createSubreddit(subreddit);
      }
      suggestionIds.push(realSuggestion.id);
    });
    return suggestionIds;
  } catch (error) {
    next({ message: error });
  }
}

const connectPostToSuggestions = async (postId, suggestions, next) => {
  let connections = suggestions.map((id) => createPostSuggestion(postId, id))
  return await Promise.all(connections).then((res) => res).catch(next);
}

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
