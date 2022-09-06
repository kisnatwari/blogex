const mongo = require("mongoose");
const { Schema } = mongo;
const blogSchema = new Schema({
    title: {
        type: String,
        unique: [true, "Title Already Exists"],
        required: [true, "Title is missing !!"]
    },
    category: String,
    image: String,
    category: String,
    content: {
        type: String,
        required: [true, "Content is missing !!"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongo.model("Blog", blogSchema);