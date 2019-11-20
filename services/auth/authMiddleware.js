const validateLoginBody = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({ status: 400, message: 'Missing required fields!' });
  } else {
    req.body = { username, password };
    next();
  }
}

module.exports = {
  validateLoginBody
}