const Sequelize = require('sequelize');

module.exports = class Stuff extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        stuff_id : {
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey: true,
        },
        stuff_name:{
          type:Sequelize.STRING(40),
          allowNull:false,
        },
        stuffcode:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        first_cost:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        fixed_price:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        provider:{
          type:Sequelize.STRING(20),
          allowNull:false,
        },
        expire_period:{
          type:Sequelize.INTEGER,
          allowNull:true,
        },
        auto_order_num:{
            type:Sequelize.INTEGER,
            allowNull:false,
            defaultValue:0,
        },
    }, {
        sequelize,
        timestamps: true, //createdAt, UpdatedAt 자동 추가
        tableName: 'stuff',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Stuff.hasMany(db.Stock,{foreignKey:'stuff_id',onDelete:'CASCADE'});
      db.Stuff.hasMany(db.Order,{foreignKey:'stuff_id',onDelete:'CASCADE'});
      db.Stuff.hasOne(db.Event,{foreignKey:'stuff_id',onDelete:'CASCADE'});
      db.Stuff.hasMany(db.Buy,{foreignKey:'stuff_id',onDelete:'CASCADE'});
    }
  };