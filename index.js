const express = require("express");
const server = express();
server.listen(8080);

const cors = require("./middleware/cors.middleware");
const bodyparser = require("./middleware/bodyparser.middleware");
const multer = require("./middleware/multer.middleware");

//middleware
server.use(cors);
server.use(bodyparser.jsonEncoder);
server.use(bodyparser.jsonEncoder);
server.use(multer);

//require routing
const blogRouting = require("./routing/blog.routing");

// middleware route
server.use("/storage", express.static(__dirname + "/storage"))
server.use("/blog", blogRouting);