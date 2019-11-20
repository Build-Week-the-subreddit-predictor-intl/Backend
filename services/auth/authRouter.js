const bcrypt = require('bcryptjs');
const authRouter = require('express').Router();
// Helpers
const { handleErrors } = require('../global/globalHelpers');
const { generateJWT } = require('./authController');
const { createRedditState } = require('../reddit/redditController');
const { validateLoginBody } = require('./authMiddleware');
const { findUser, addUser } = require('./authModel');
// Endpoints
authRouter.post('/login', validateLoginBody, (req, res, next) => {
  const { username, password } = req.body;
  findUser({ username }).then(user => {
    if (!user || !user.password) {
      next({ status: 404, message: "This user does not exist!" });
    } else {
      const isValidPassword = bcrypt.compareSync(password, user.password);
      if (!isValidPassword) {
        next({ status: 403, message: "Invalid credentials" });
      } else {
        const token = generateJWT(user);
        let nowSeconds = Math.floor(Date.now()/1000);
        let tokenSeconds = user.expires_in ? user.expires_in : 0;
        const isValidRedditToken = (nowSeconds < tokenSeconds && (user.access_token ? true : false));
        res.status(200).json({
          id: user.id,
          token,
          redditAuth: isValidRedditToken,
          redditState: createRedditState({ id: user.id })
        });
      }
    }
  }).catch(next);
});

authRouter.post('/register', validateLoginBody, (req, res, next) => {
  const { username, password } = req.body;
  const hash = bcrypt.hashSync(password, 11);
  addUser({ username: username, password: hash }).then(user => {
    if (!user) {
      next({ message: "User could not be added!" })
    } else {
      res.status(201).json(user);
    }
  }).catch(next);
});

handleErrors('authRouter', authRouter);

module.exports = authRouter;
