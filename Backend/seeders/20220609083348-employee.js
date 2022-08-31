'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employee', [{
      employee_name: "김점주",
      employee_phone: '01011111111',
      branch_id: 1,
      createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    },
    {
      employee_name: "김알바",
      employee_phone: '01011111112',
      salary: 10000,
      branch_id: 1,
      createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    },
    {
      employee_name: "원점주",
      employee_phone: '01022222222',
      branch_id: 2,
      createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    },
    {
      employee_name: "원알바",
      employee_phone: '01022222223',
      salary: 10000,
      branch_id: 2,
      createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    },
    ], {});
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
