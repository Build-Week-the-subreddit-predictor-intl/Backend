function validatePost(req, res, next) {
	const { text, title } = req.body;
	if (!Object.keys(req.body)) {
		res.status(400).json({
			message: "post data was not provided"
		});
	}
	!text || !title
		? res.status(400).json({
				message: "post title or body data was not provided"
		})
		: next();
}

module.exports = {
	validatePost
};
