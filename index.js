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
server.use(bodyparser.multer);

//require routing
const blogRouting = require("./routing/blog.routing");

// middleware route
server.use("/blog", blogRouting);