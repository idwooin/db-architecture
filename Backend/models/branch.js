const Sequelize = require('sequelize');

module.exports = class Branch extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        branch_id : {
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey: true,
          autoIncrement: true,
        },
        branch_name:{
          type: Sequelize.STRING(12),
          allowNull:false,
        },
        branch_address:{
          type:Sequelize.STRING(60),
          allowNull:false,
        },
        business_num:{
          type:Sequelize.STRING(10),
          allowNull:false,
        },
        owner:{
          type: Sequelize.STRING(40),
          allowNull:false,
        },
        owner_num:{
          type:Sequelize.STRING(12),
          allowNull:false,
        },
        month_fee:{
          type:Sequelize.INTEGER,
          allowNull:true,
        },
    }, {
        sequelize,
        timestamps:true,
        tableName: 'branch',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Branch.hasMany(db.Profit,{foreignKey:'branch_id',onDelete:'CASCADE'})
      db.Branch.hasMany(db.Cost,{foreignKey:'branch_id',onDelete:'CASCADE'})
      db.Branch.hasMany(db.Employee,{foreignKey:'branch_id',onDelete:'CASCADE'})
      db.Branch.hasMany(db.Stock,{foreignKey:'branch_id',onDelete:'CASCADE'})
      db.Branch.hasMany(db.Buy,{foreignKey:'branch_id',onDelete:'CASCADE'})
      db.Branch.hasMany(db.Package,{foreignKey:'branch_id',onDelete:'CASCADE'})
      db.Branch.hasMany(db.User,{foreignKey:'branch_id',onDelete:'CASCADE'})
    }
  };