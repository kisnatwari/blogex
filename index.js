const express = require("express");
const server = express();
server.listen(8080);

//Enable cors policy
const cors = require("cors");
server.use(cors());

//recieve body text
const body = require("body-parser");
const urlEncoder = body.urlencoded({ extended: false });
const jsonEncoder = body.json();
const multer = require("multer");
const multipart = multer().single("image");
//server.use(urlEncoder);
//server.use(jsonEncoder);
server.use(multipart);

//require routing
const blogRouting = require("./routing/blog.routing");

// middleware route
server.use("/blog", blogRouting);