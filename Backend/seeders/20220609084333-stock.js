'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stock',[
       {
        stuff_id:1,
        branch_id:1,
        stock_num: 50,
        expired_date: new Date('2023-05-17 10:20:30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_id:2,
        branch_id:1,
        stock_num: 45,
        expired_date: new Date('2024-05-17 10:20:30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_id:3,
        branch_id:2,
        stock_num: 88,
        expired_date: new Date('2024-06-17 10:00:00').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_id:4,
        branch_id:1,
        stock_num: 100,
        expired_date: new Date('2022-10-17 10:20:30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_id:4,
        branch_id:2,
        stock_num: 130,
        expired_date: new Date('2024-10-27 10:20:30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_id:5,
        branch_id:2,
        stock_num: 102,
        expired_date: new Date('2024-10-27 10:20:30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_id:5,
        branch_id:2,
        stock_num: 2,
        expired_date: new Date('2024-10-27 10:20:30').toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       }
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
