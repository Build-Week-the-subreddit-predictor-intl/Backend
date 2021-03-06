const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { logger } = require("../services/global/globalHelpers");

const authRouter = require("../services/auth/authRouter");
const redditRouter = require("../services/reddit/redditRouter");
const postsRouter = require("../services/posts/postsRouter");

const server = express();
const { origin } = require("../config");

server.use(helmet());
server.use(
	cors({
		origin,
	})
);
server.use(express.json());
server.use(logger);

server.get("/", (req, res) => {
	res.status(200).json({ message: "Server is running" });
});

server.use("/api/auth", authRouter);
server.use("/api/reddit", redditRouter);
server.use("/api/posts", postsRouter);

module.exports = server;
