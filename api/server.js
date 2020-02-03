const express = require("express");

const postsRouter = require("../posts/postsRouter.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.send(`
    <h2>Lambda Hubs API</h>
    <p>This thing is actually working!</p>
  `);
});

server.use("/api/posts", postsRouter);

module.exports = server;
