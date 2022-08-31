const Sequelize = require('sequelize');

module.exports = class Employee extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        employee_id : {
            type: Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        employee_name:{
          type:Sequelize.STRING(40),
          allowNull:false,
        },
        employee_phone:{
          type:Sequelize.STRING(12),
          allowNull:true,
        },
        salary:{
          type:Sequelize.INTEGER,
          allowNull:true,
        },
    }, {
        sequelize,
        timestamps: true, //createdAt, UpdatedAt 자동 추가
        tableName: 'employee',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Employee.hasMany(db.Commute,{foreignKey:'employee_id',onDelete:'CASCADE'});
      db.Employee.hasOne(db.User,{foreignKey:'employee_id',onDelete:'CASCADE'});
      db.Employee.belongsTo(db.Branch,{foreignKey:'branch_id'});
    }
  };