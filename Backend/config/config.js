require('dotenv').config()

module.exports = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    dialect:"mysql",
};