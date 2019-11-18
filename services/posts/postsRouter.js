const express = require("express");

const { validatePost } = require("./usersMiddleware");

const router = express.Router();

router.get('/')
router.post('/', validatePost)

router.get('/:id')
router.put('/:id', validatePost)
router.delete('/:id')


module.exports = router;
