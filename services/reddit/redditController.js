const config = require('../../config');
const { objectToQueryString, toBase64 } = require('../global/globalHelpers');

const authorizeRedditAccess = (userId, isMobile = false) => {
  const options = {
    client_id: config.redditClientId,
    response_type: 'code',
    state: toBase64(JSON.stringify({ id: userId })),
    redirect_uri: config.redditRedirectURL,
    duration: 'permanent',
    scope: 'submit mysubreddits' // OR 'submit,mysubreddits'
    //identity, edit, flair, history, modconfig, modflair, modlog, modposts, modwiki, mysubreddits, privatemessages, read, report, save, submit, subscribe, vote, wikiedit, wikiread
  }
  return 'https://www.reddit.com/api/v1/authorize' + (isMobile ? '.compact' : '') + objectToQueryString(options);
}

module.exports = {
  authorizeRedditAccess
}