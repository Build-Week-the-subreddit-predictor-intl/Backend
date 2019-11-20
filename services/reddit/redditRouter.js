const config = require('../../config');
const axios = require('axios');
const redditRouter = require('express').Router();
// Helpers
const { findUser, updateUser } = require('../auth/authModel');
const {
  requireLogin,
  handleErrors,
  objectToQueryString,
  toBase64,
  toUTF8
} = require('../global/globalHelpers');
const { authorizeRedditAccess } = require('./redditController');
// Endpoints
redditRouter.get('/', requireLogin, (req, res, next) => {
  const { mobile } = req.query;
  const data = {
    id: req.loggedInUser.subject,
  };
  res.status(200).json({ url: authorizeRedditAccess(data, mobile ? true : false) });
});

redditRouter.post('/auth', async (req, res, next) => {
  try {
    const { state, code, error } = req.body;
    if (error) {
      next({ message: error, status: 403 });
      return;
    }
    const validState = JSON.parse(toUTF8(decodeURIComponent(state))); // TODO: IMPORTANT missing check if state has been tampered with!!!
    if (!validState || !validState.id) {
      next({ message: "Invalid state/code. Data has been compromised.", status: 401 });
      return;
    }
    let user = await findUser({ id: validState.id });
    let payload = {
      grant_type: (!user.access_token ? 'authorization_code' : 'refresh_token'), 
      redirect_uri: config.redditRedirectURL,
    };
    if (payload.grant_type !== 'refresh_token') {
      payload.code = code;
    } else {
      payload.refresh_token = user.refresh_token;
    }
    payload = objectToQueryString(payload, false);
    let auth = toBase64(config.redditClientId + ':' + config.redditClientSecret);
    let options = { headers: { Authorization: 'Basic ' + auth } };
    const redditAccess = await axios.post('https://www.reddit.com/api/v1/access_token', payload, options)
    if (redditAccess.data.error) {
      next({ message: redditAccess.data.error });
      return;
    }
    // save access_token, refresh_token to user table | token_type, expires_in, scope
    redditAccess.data.expires_in = Math.floor(Date.now()/1000) + redditAccess.data.expires_in;
    const updatedUser = await updateUser(redditAccess.data, user.id);
    if (updatedUser && updatedUser.id) {
      res.status(200).json({ authorized: true });
    } else {
      res.status(403).json({ authorized: false });
    }
  } catch (error) {
    next({ message: error });
  }
});

handleErrors('redditRouter', redditRouter);

module.exports = redditRouter;
