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

router.post("/", requireLogin, validatePost, makePost);

router.get("/all", requireLogin, fetchAllUserPosts);

router.get("/:id", requireLogin, fetchPostById);
router.put("/:id", requireLogin, validatePost, updatePost);
router.delete("/:id", requireLogin, removePost);

handleErrors('postsRouter', router);

module.exports = router;
