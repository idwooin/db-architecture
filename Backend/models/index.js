const Sequelize = require('sequelize');
const dbConfig = require("../config/config");
const Stuff = require('./stuff');
const Stock = require('./stock');
const Buy = require('./buy');
const Branch= require('./branch');
const Package = require('./package');
const Profit = require('./profit');
const Cost = require('./cost');
const Order = require('./order');
const Employee = require('./employee');
const Commute = require('./commute');
const Event = require('./event');
const Code = require('./code');
const User = require('./user');
const db = {};

// dba, root, admin
const sequelize = new Sequelize(dbConfig.database,dbConfig.username,dbConfig.password,dbConfig);

// db dictionary에 삽입
db.sequelize = sequelize;
db.Stuff = Stuff;
db.Stock = Stock;
db.Buy = Buy;
db.Branch= Branch;
db.Package = Package;
db.Profit = Profit;
db.Cost = Cost;
db.Order = Order;
db.Employee = Employee;
db.Commute = Commute;
db.Event = Event;
db.Code = Code;
db.User = User;

Stuff.init(sequelize);
Stock.init(sequelize);
Buy.init(sequelize);
Branch.init(sequelize);
Package.init(sequelize);
Profit.init(sequelize);
Cost.init(sequelize);
Order.init(sequelize);
Employee.init(sequelize);
Commute.init(sequelize);
Event.init(sequelize); 
Code.init(sequelize);
User.init(sequelize);

Stuff.associate(db);
Stock.associate(db);
Buy.associate(db);
Package.associate(db);
Profit.associate(db);
Cost.associate(db);
Order.associate(db);
Employee.associate(db);
Commute.associate(db);
Event.associate(db);
User.associate(db);

module.exports = db;
