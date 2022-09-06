const db = require("../database/db");

const createBlog = async (request, response) => {
    const data = request.body;
    const fileInfo = request.file;
    if (!fileInfo) {
        response.status(404);
        response.json({
            type: "image-validation",
            field: "image",
            message: "Please insert an image"
        })
    }
    data['image'] = fileInfo.destination + "/" + fileInfo.filename;
    try {
        const dataRes = await db.createData(data);
        response.status(200);
        response.json(dataRes);
    }
    catch (error) {
        response.status(409);
        console.log(error);
        let field = [];
        if (error.code && error.code == 11000) {
            response.json({
                type: "unique",
                message: "Duplicate title found",
                field: "title"
            });
        }
        else if (error.errors) {
            for (key in error.errors) {
                console.log(key);
                field.push({
                    name: key,
                    message: error.errors[key].message
                })
            }
            response.json({
                type: "required",
                field: field
            });
        }
        else {
            response.json(error);
        }
    }
}

const getAllBlogs = async (request, response) => {
    const dataRes = await db.getAll();
    if (dataRes.length != 0) {
        response.status(200);
        response.json(dataRes);
    }
    else {
        response.status(404);
        response.json({
            message: "No blog found"
        })
    }
}

const getBlogsByCategory = async (request, response) => {
    const category = request.params.category;
    const dataRes = await db.getByQuery({
        category: category
    });
    if (dataRes.length > 0) {
        response.status(200);
        response.json(dataRes);
    }
    else {
        response.status(404);
        response.json({
            message: "No blog found"
        })
    }
}

module.exports = {
    createBlog: createBlog,
    getAllBlogs: getAllBlogs,
    getBlogsByCategory: getBlogsByCategory
};