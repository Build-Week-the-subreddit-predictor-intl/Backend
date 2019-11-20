const axios = require('axios');
const {
  getAllPosts,
  createPost,
  getPostById,
  editPost,
  deletePost,
  getPostSuggestions,
  getAllPostsWithSuggestions
} = require("./postsModel");

const fetchAllUserPosts = async (req, res, next) => {
  try {
    const id = req.loggedInUser.subject;
    let allPosts = await getAllPostsWithSuggestions(id);
    allPosts = allPosts.reduce((posts, post) => {
      if (!posts[post.id]) {
        posts[post.id] = { ...post };
      }
      if (!posts[post.id].suggestion) {
        posts[post.id].suggestion = [];
        delete posts[post.id].subreddit_id;
        delete posts[post.id].subreddit_name;
      }
      if (post.subreddit_name && post.subreddit_id) {
        posts[post.id].suggestion.push(post.subreddit_name);
      }
      return posts;
    }, {});
    allPosts = Object.values(allPosts);
    res.status(200).json(allPosts);
  } catch (error) {
    next({ message: error });
  }
};

const fetchPostById = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await getPostById(id);
    let suggestions = await getPostSuggestions(id);
    let postSuggestion = {
      ...post,
      suggestion: suggestions.map(sug => sug.subreddit_name)
    };
    res.status(200).json(postSuggestion);
  } catch (err) {
    next({ message: error });
  }
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
      if (!realSuggestion || !realSuggestion.id) {
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

const postReddit = (req, res, next) => {
  const { subreddit, title, text } = req.body;
  if (!subreddit) {
    next({ message: "Missing required field `subreddit`", status: 401 });
    return;
  }
  // required fields to submit a text post
  // title, text, sr (subreddit name), kind (always "self"), 
  // uh (currently logged in user's modhash) what is this 
  const redditPost = {
    sr: subreddit,
    title: title,
    text: text,
    kind: 'self',
    uh: user.access_token
  }
  res.status(200).json(redditPost);
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
  postReddit,
  updatePost,
  removePost
};
