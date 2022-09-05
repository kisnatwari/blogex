const bodyparser = require("body-parser");
const urlEncoder = bodyparser.urlencoded({ extended: false });
const jsonEncoder = bodyparser.json();

module.exports = {
    urlEncoder: urlEncoder,
    jsonEncoder: jsonEncoder
}