const config = require('../../config');
const bcrypt = require('bcryptjs');
const redditRouter = require('express').Router();
// Helpers
const authHelpers = require('../auth/authHelpers');
const {
  requireLogin,
  handleErrors,
  authorizeRedditAccess,
  objectToQueryString
} = require('../global/globalHelpers');
// Endpoints
redditRouter.get('/', requireLogin, (req, res, next) => {
  const { mobile } = req.query;
  res.status(200).json({ url: authorizeRedditAccess(mobile ? true : false) });
});

redditRouter.get('/auth', requireLogin, (req, res, next) => {
  const { state, code, error } = req.query;
  if (!error) {
    const isValidState = bcrypt.compareSync(config.redditState, decodeURIComponent(state));
    let payload = objectToQueryString({
      grant_type: (req.loggedInUser.access_token ? 'refresh_token' : 'authorization_code'),
      redirect_uri: config.redditRedirectURL,
      duration: 'permanent'
    }, false);
    if (isValidState) {
      if (code) {
        payload.code = code;
      }
      axios.post('https://www.reddit.com/api/v1/access_token', payload).then(response => {
        // save access_token, refresh_token to user table | token_type, expires_in, scope
        const data = response.data;
        let payload;
        if (data.access_token) {
          payload.access_token = data.access_token;
        } else next({ message: "No access token could be provided.", status: 404 });
        if (data.refresh_token) {
          payload.refresh_token = data.refresh_token;
        }
        authHelpers.updateUser(payload, req.loggedInUser.id).then(response => {
          if (response.data && response.data.id) {
            res.status(200).json({ authorized: true }); //req.loggedInUser.redditAuth = true;
          } else {
            res.status(403).json({ authorized: false });
          }
        }).catch(next);
      });
    } else {
      next({ message: "Invalid state/code. Data has been compromised.", status: 401 });
    }
  } else {
    next({ message: error, status: 403 });
  }
});

handleErrors('redditRouter', redditRouter);

module.exports = redditRouter;
