'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stuff',[
       {
        stuff_name:'슈넬',
        stuffcode: 1,
        first_cost: 1500,
        fixed_price: 2300,
        provider: '슈넬',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'칫솔',
        stuffcode: 2,
        first_cost: 500,
        fixed_price: 1000,
        provider: '세균',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'담배',
        stuffcode: 3,
        first_cost: 1000,
        fixed_price: 4500,
        provider: '말보로',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'와일드바디',
        stuffcode: 4,
        first_cost: 200,
        fixed_price: 1000,
        provider: '농심',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'쿠우쿠우',
        stuffcode: 5,
        first_cost: 600,
        fixed_price: 2200,
        provider: '농심',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'그럴만두',
        stuffcode: 6,
        first_cost: 2000,
        fixed_price: 5000,
        provider: '교자',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'구글플레이카드',
        stuffcode: 7,
        first_cost: 9000,
        fixed_price: 10000,
        provider: '구글',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'포카칩',
        stuffcode: 8,
        first_cost: 600,
        fixed_price: 2000,
        provider: '오리온',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'호빵',
        stuffcode: 9,
        first_cost: 500,
        fixed_price: 1000,
        provider: 'UOS25',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
       },
       {
        stuff_name:'로또',
        stuffcode: 10,
        first_cost: 0,
        fixed_price: 1000,
        provider: '로또회사',
        createdAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        updatedAt: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
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
