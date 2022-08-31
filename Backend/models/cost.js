const Sequelize = require('sequelize');

module.exports = class Cost extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        cost_id : {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        costcode:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        cost:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        cost_date:{
          type: Sequelize.DATE,
          allowNull:false,
        },
        type_id : {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
    }, {
        sequelize,
        timestamps:true,
        tableName: 'cost',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Cost.belongsTo(db.Branch,{foreignKey:'branch_id'});
    }
  };