const config = require('../../config');
const axios = require('axios');
const bcrypt = require('bcryptjs');
const redditRouter = require('express').Router();
// Helpers
const { updateUser } = require('../auth/authModel');
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

redditRouter.get('/auth', async (req, res, next) => {
  try {
    const { state, code, error } = req.query;
    if (error) {
      next({ message: error, status: 403 });
      return;
    }
    const isValidState = bcrypt.compareSync(config.redditState, decodeURIComponent(state));
    if (!isValidState) {
      next({ message: "Invalid state/code. Data has been compromised.", status: 401 });
      return;
    }
    let payload = {
      grant_type: 'authorization_code', // or 'refresh_token' if user has auth token
      redirect_uri: config.redditRedirectURL,
    };
    if (code) {
      payload.code = code;
    }
    payload = objectToQueryString(payload, false);
    let buffer = Buffer.from(config.redditClientId + ':' + config.redditClientSecret).toString('base64');
    let options = { headers: { Authorization: 'Basic ' + buffer } };
    const redditAccess = await axios.post('https://www.reddit.com/api/v1/access_token', payload, options)
    if (redditAccess.data.error) {
      next({ message: redditAccess.data.error });
      return;
    }
    // save access_token, refresh_token to user table | token_type, expires_in, scope
    const updatedUser = await updateUser(redditAccess.data, req.loggedInUser.subject);
    if (updatedUser.data && updatedUser.data.id) {
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
