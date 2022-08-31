const Sequelize = require('sequelize');

module.exports = class Buy extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        buy_id : {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        buy_num:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        buycode:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        age:{
          type: Sequelize.INTEGER,
          allowNull:true,
        },
        sex:{
          type: Sequelize.BOOLEAN,
          allowNull:true,
        },
        price:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        buy_date:{
          type:Sequelize.DATE,
          allowNull:false,
          defaultValue:Sequelize.literal('now()'),
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'buy',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Buy.belongsTo(db.Branch,{foreignKey:'branch_id'});
      db.Buy.belongsTo(db.Stock,{foreignKey:'stuff_id'});
    }
  };