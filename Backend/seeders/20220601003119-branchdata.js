'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.bulkInsert('branch', [{
        branch_name: '전농1동 1호점', branch_address: '어딘가',
        business_num: '0000011111', owner: '홍길동', owner_num: '01012345678',
        month_fee: 500000,
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      },
      {
        branch_name: '전농2동 1호점', branch_address: '어딘가',
        business_num: '0000011112', owner: '김철수', owner_num: '01012345679',
        month_fee: 500000,
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
