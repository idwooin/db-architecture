'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('event',[
       {
        eventcode:1,
        startdate:new Date('2022-06-01').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        enddate: new Date('2022-06-30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        disrate:null,
        disprice:null,
        stuff_name:'슈넬',
        stuff_id:1,
       },
       {
        eventcode:2,
        startdate:new Date('2022-06-01').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        enddate: new Date('2022-06-30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        disrate:null,
        disprice:null,
        stuff_name:'칫솔',
        stuff_id:2,
       },
       {
        eventcode:3,
        startdate:new Date('2022-06-01').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        enddate: new Date('2022-06-30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        disrate:null,
        disprice:null,
        stuff_name:'와일드바디',
        stuff_id:4,
       },
       {
        eventcode:4,
        startdate:new Date('2022-06-01').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        enddate: new Date('2022-06-30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        disrate:50,
        disprice:1100,
        stuff_name:'쿠우쿠우',
        stuff_id:5,
       },
    ],{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
