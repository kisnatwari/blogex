const express = require("express");
const router = express.Router();
const blogController = require("../controller/blog.controller.js");

router.get("/", (request, response) => {
    response.send("Get Request");
})

router.post("/", (request, response) => {
    blogController.createBlog(request, response);
})

router.put("/", (request, response) => {
    response.send("Put Request");
})

router.delete("/", (request, response) => {
    response.send("Delete Request");
})


module.exports = router;