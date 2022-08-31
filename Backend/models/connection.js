const Sequelize = require('sequelize');
require('dotenv').config();

const conn = {};
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: '56198',
    operatorsAliases: 'false',
    logging: false
});

conn.sequelize = sequelize;
conn.Sequelize = Sequelize;

module.exports = conn;