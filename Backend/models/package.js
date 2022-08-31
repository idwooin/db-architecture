const Sequelize = require('sequelize');

module.exports = class Package extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        package_id : {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        weight:{
          type:Sequelize.FLOAT,
          allowNull:false,
        },
        b_phone:{
          type:Sequelize.STRING(12),
          allowNull:false,
        },
        b_address:{
          type:Sequelize.STRING(60),
          allowNull:false,
        },
        b_name:{
          type:Sequelize.STRING(40),
          allowNull:false,
        },
        s_phone:{
          type:Sequelize.STRING(12),
          allowNull:false,
        },
        s_address:{
          type:Sequelize.STRING(60),
          allowNull:false,
        },
        s_name:{
          type:Sequelize.STRING(40),
          allowNull:false,
        },
        commision:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        package_price:{
          type:Sequelize.INTEGER,
          allowNull:false,
        },
        pakage_type:{
          type:Sequelize.INTEGER,
          allowNull:false
        }
    }, {
        sequelize,
        timestamps:true,
        tableName: 'package',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Package.belongsTo(db.Branch,{foreignKey:'branch_id'});
    }
  };