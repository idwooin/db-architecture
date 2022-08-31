'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user', [{
      user_id: 'employer',
      user_name: "김점주",
      user_pw: '1234',
      user_type: 0,
      branch_id: 1,
      employee_id: 1,
      createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    },
    {
      user_id: 'employee',
      user_name: "김알바",
      user_pw: '5678',
      user_type: 1,
      branch_id: 1,
      employee_id: 2,
      createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    },
    {
      user_id: 'employer2',
      user_name: "원점주",
      user_pw: '1357',
      user_type: 0,
      branch_id: 2,
      employee_id: 3,
      createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
    },
    {
      user_id: 'employee2',
      user_name: "원알바",
      user_pw: '2468',
      user_type: 1,
      branch_id: 2,
      employee_id: 4,
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
