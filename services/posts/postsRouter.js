const express = require("express");

const { validatePost } = require("./postsMiddleware");

const {
	fetchAllUserPosts,
	fetchPostById,
	makePost,
	updatePost,
	removePost
} = require("./postsController");

const router = express.Router();

router.post("/", validatePost, makePost);

router.get("/all/:id", fetchAllUserPosts);

router.get("/:id", fetchPostById);
router.put("/:id", validatePost, updatePost);
router.delete("/:id", removePost);

module.exports = router;
