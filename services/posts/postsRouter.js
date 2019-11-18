const express = require("express");

const { validatePost } = require("./postsMiddleware");
const {
	fetchAllPosts,
	fetchPostById,
	makePost,
	updatePost,
	removePost
} = require("./postsController");

const router = express.Router();

router.get("/", fetchAllPosts);
router.post("/", validatePost, makePost);

router.get("/:id", fetchPostById);
router.put("/:id", validatePost, updatePost);
router.delete("/:id", removePost);

module.exports = router;
