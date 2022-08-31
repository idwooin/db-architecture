const Sequelize = require('sequelize');

module.exports = class Commute extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        commute_id : {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        commute_start:{
          type:Sequelize.DATE,
          allowNull:false,
          defaultValue:Sequelize.literal('now()'),
        },
        commute_end:{
          type:Sequelize.DATE,
          allowNull:false,
          defaultValue:Sequelize.literal('now()'),
        },
    }, {
        sequelize,
        timestamps:false, //createdAt, UpdatedAt 자동 추가
        tableName: 'commute',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Commute.belongsTo(db.Employee,{foreignKey:'employee_id'});
    }
  };


  