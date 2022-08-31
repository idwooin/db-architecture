const { version } = require('../package.json');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
    // 사용하는 api version
    openapi: '3.0.0',
    // api 정보 (선택사항)
    info: {
      title: 'db-arch API documentation',
      version,
      license: {
        name: 'MIT',
      },
    },
    // 기본 url 정의, 배열로 정의 가능
    servers: [
      {
        url: `http://localhost:3001/`,
      },
    ],
  };
  
  // swagger api가 존재하는 곳
  var options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['docs/*.yml', 'controller/api/*.js'],
};

const swaggerSpec= swaggerJSDoc(options);

module.exports = swaggerSpec;