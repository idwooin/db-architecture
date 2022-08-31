const Sequelize = require('sequelize');

module.exports = class Code extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        code : {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        sec_code:{
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        code_name:{
            type: Sequelize.STRING(8),
            allowNull: false,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'code',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  };