const dotenv = require("dotenv");
dotenv.config();

const config = {
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGOURI || "mongodb://localhost:27017/formgenerator"
};

module.exports = config;