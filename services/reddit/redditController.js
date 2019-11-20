const config = require('../../config');
const jwt = require('jsonwebtoken');
const { objectToQueryString } = require('../global/globalHelpers');

const authorizeRedditAccess = (info, isMobile = false) => {
  const options = {
    client_id: config.redditClientId,
    response_type: 'code',
    state: createRedditState(info),
    redirect_uri: config.redditRedirectURL,
    duration: 'permanent',
    scope: 'submit mysubreddits' // OR 'submit,mysubreddits'
    //identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread
  }
  return 'https://www.reddit.com/api/v1/authorize' + (isMobile ? '.compact' : '') + objectToQueryString(options);
}

const createRedditState = (info) => {
  const payload = {
    subject: "RedditAuthToken",
    ...info
  }
	const options = {
		expiresIn: "8h"
	};
  return jwt.sign(payload, config.jwtSecret, options);
}

module.exports = {
  createRedditState,
  authorizeRedditAccess
}