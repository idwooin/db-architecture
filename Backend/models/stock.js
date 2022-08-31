const Sequelize = require('sequelize');

module.exports = class Stock extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        stock_id : {
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey: true,
        },
        stock_num:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        expired_date:{
          type:Sequelize.DATE,
          allowNull:true,
        },
    }, {
        sequelize,
        timestamps:true, //createdAt, UpdatedAt 자동 추가
        tableName: 'stock',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Stock.belongsTo(db.Stuff,{foreignKey:'stuff_id'});
      db.Stock.belongsTo(db.Branch,{foreignKey:'branch_id'});
    }
  };