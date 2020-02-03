const server = require("./api/server.js");

server.listen(4000, () => {
	console.log("\n*** Server Running on http://localhost:4000 ***\n");
});

// create a new server.js file somewhere
// move everything but the serve.listen() out of index
// require the server from index.js
// module.exports the server from server.js
// update the path to accommodate the changes (hubs-model.js)
