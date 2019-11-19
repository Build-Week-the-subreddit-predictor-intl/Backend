require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const adminpw = process.env.ADMIN_PW;
const isProduction = env === 'production';
const port = process.env.PORT || 4000;

module.exports = {
  adminpw,
  env,
  port,
  pgdburl: process.env.DATABASE_URL, // postgres (see Luis video)
  origin: [
    // for cookies to work with [SPA] + [API on different domain]
    // we can't enable CORS for '*'
    'http://localhost:3000',
    'https://front-end.posthere.now.sh/',
    'https://post-here-api.herokuapp.com/'
  ],
  secure: isProduction, // cookie sent over http only in dev
  jwtSecret: process.env.TOKENSECRET,
  redditState: process.env.REDDIT_STATE,
  redditClientId: process.env.REDDIT_CLIENT_ID,
  redditClientSecret: process.env.REDDIT_CLIENT_SECRET,
  redditRedirectURL: process.env.REDDIT_REDIRECT_URL,
  dataScienceModel: process.env.DS_URL
}