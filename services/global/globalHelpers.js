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

const authorizeRedditAccess = (isMobile = false) => {
  const options = {
    client_id: config.redditClientId,
    response_type: 'code',
    state: bcrypt.hashSync(config.redditState, 11),
    redirect_uri: config.redditRedirectURL,
    duration: 'permanent',
    scope: 'submit mysubreddits' // OR 'submit,mysubreddits'
    //identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread
  }
  return 'https://www.reddit.com/api/v1/authorize' + (isMobile ? '.compact' : '') + objectToQueryString(options);
}

module.exports = {
  logger,
  requireLogin,
  handleErrors,
  authorizeRedditAccess,
  objectToQueryString
};
