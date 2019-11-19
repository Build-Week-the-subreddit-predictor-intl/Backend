const express = require("express");

const { handleErrors, requireLogin } = require('../global/globalHelpers');
const { validatePost } = require("./postsMiddleware");

const {
	fetchAllUserPosts,
	fetchPostById,
	makePost,
	updatePost,
	removePost
} = require("./postsController");

const router = express.Router();

router.get("/", requireLogin, fetchAllUserPosts);
router.get("/:id", requireLogin, validatePostId, fetchPostById);
router.post("/", requireLogin, validatePost, makePost);
router.put("/:id", requireLogin, validatePostId, validatePost, updatePost);
router.delete("/:id", requireLogin, validatePostId, removePost);

handleErrors('postsRouter', router);

module.exports = router;
