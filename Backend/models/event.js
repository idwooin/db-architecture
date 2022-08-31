const Sequelize = require('sequelize');

module.exports = class Event extends Sequelize.Model {
    static init(sequelize) {
        // 속성 부분
      return super.init({
        id : {
          type: Sequelize.INTEGER,
          autoIncrement:true,
          primaryKey: true,
        },
        eventcode:{
          type: Sequelize.INTEGER,
          allowNull:false,
        },
        startdate:{
          type:Sequelize.DATEONLY,
          allowNull:false,
        },
        enddate:{
          type:Sequelize.DATEONLY,
          allowNull:false,
        },
        disrate:{
          type:Sequelize.INTEGER,
          allowNull:true,
        },
        disprice:{
          type:Sequelize.INTEGER,
          allowNull:true,
        },
        stuff_name:{
          type:Sequelize.STRING(40),
          allowNull:false,
        },

    }, {
        sequelize,
        timestamps:false, //createdAt, UpdatedAt 자동 추가
        tableName: 'event',
        paranoid : true, // 삭제일 (복구용)
        charset: 'utf8',
        collate: 'utf8_general_ci', // 삭제일 (복구용)
      });
    }
  
    static associate(db) {
      db.Event.belongsTo(db.Stuff,{foreignKey:'stuff_id'});
    }
  };