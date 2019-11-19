function validatePost(req, res, next) {
	const { text, title } = req.body;
	if (!Object.keys(req.body).length) {
		next({ message: "Post data was not provided", status: 400 });
	}
	if(!title || !text) {
    next({ message: "Missing one of the required fields: title, text", status: 401 })
  } else {
    next();
  }
}

module.exports = {
	validatePost
};
