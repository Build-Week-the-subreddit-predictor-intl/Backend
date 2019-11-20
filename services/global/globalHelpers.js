const config = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

const requireLogin = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decodedUser) => {
      if (err) {
        next({ message: err });
      } else {
        req.loggedInUser = decodedUser;
        next();
      }
    });
  } else {
    next({ status: 403, message: "You need to login in order to gain access!" });
  }
}

const requireReddit = (req, res, next) => {
  const { state, error } = req.body;
  if (error) {
    next({ message: error });
    return;
  }
  if (!state) {
    next({ message: "Missing required field `state`!", status: 401 });
    return;
  } else {
    jwt.verify(state, config.jwtSecret, (err, decodedRedditToken) => {
      if (err) {
        next({ message: err });
        return;
      } else {
        req.redditState = decodedRedditToken;
        next();
      }
    });
  }
}

const requireRedditAccess = async (req, res, next) => {
  const user = await findUser({ id: req.loggedInUser.subject });
  if (!user.access_token) {
    next({ message: "User is not authenticated with reddit!", status: 403 });
    return;
  }
  let nowSeconds = Math.floor(Date.now()/1000);
  let tokenSeconds = user.expires_in ? user.expires_in : 0;
  const isValidRedditToken = nowSeconds < tokenSeconds;
  if (!isValidRedditToken) {
    next({ message: "User is not authenticated with reddit!", status: 403 });
    return;
  }
  next();
}

const handleErrors = (file, router) => {
  router.use((error, req, res, next) => {
    res.status(error.status || 500).json({
      file: file,
      url: req.url,
      method: req.method,
      status: error.status || 500,
      message: error.message,
      protocol: req.protocol
    }).end();
  });
}

const objectToQueryString = (obj, questionMark = true) => {
  return (questionMark ? '?' : '') + Object.keys(obj).reduce((a, k) => [...a, k + '=' + encodeURIComponent(obj[k])], []).join('&');
}

const toBase64 = (data) => Buffer.from(data).toString('base64');
const toUTF8 = (data) => Buffer.from(data, 'base64').toString('utf-8');

module.exports = {
  logger,
  requireLogin,
  requireReddit,
  requireRedditAccess,
  handleErrors,
  objectToQueryString,
  toBase64,
  toUTF8
};
