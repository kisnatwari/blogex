const mongo = require("mongoose");
const blogSchema = require("../model/blog.model");

mongo.connect("mongodb://localhost:27017/blogex");

const createData = async (data) => {
    const collection = new blogSchema(data);
    const dataRes = await collection.save();
    return dataRes;
}

module.exports = {
    createData: createData
}