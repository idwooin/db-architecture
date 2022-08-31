const express = require('express');
const CostRoute = require('./cost.controller');
const docsRoute = require('./docs.controller');
const ProfitRoute = require('./profit.controller');
const EmployeeRoute = require('./employee.controller');
const OrderRoute = require('./order.controller');
const AuthRoute = require('./auth.controller');
const packageRoute = require('./package.controller')
const eventRoute = require('./event.controller')
const authority = require('../middleware/authorityCheck');
const commuteRoute = require('./commute.controller');
const buyRoute = require('./buy.controller');
const stuffRoute = require('./stuff.controller');
const stockRoute = require('./stock.controller')

const router = express.Router();

const authority_null = [
  {
    path: '/auth',
    route: AuthRoute
  }
]

const authority_employee = [
  {
    path: '/stuff',
    route: stuffRoute,
  },
  {
    path: '/cost',
    route: CostRoute,
  },
  {
    path: '/profit',
    route: ProfitRoute,
  },
  {
    path: '/package',
    route: packageRoute,
  },
  {
    path: '/commute',
    route: commuteRoute,
  },
  {
    path: '/buy',
    route: buyRoute,
  },
]

const authority_employer = [
  {
    path: '/employee',
    route: EmployeeRoute,
  },
  {
    path: '/order',
    route: OrderRoute,
  },
  {
    path: '/event',
    route: eventRoute,
  },
  {
    path: '/stock',
    route: stockRoute,
  },
]

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];


devRoutes.forEach((route) => {
  router.use(route.path,route.route);
});

authority_null.forEach((route) => {
  router.use(route.path, route.route);
});

authority_employee.forEach((route) => {
  router.use(route.path, authority.authority_employee_check, route.route);
})

authority_employer.forEach((route) => {
  router.use(route.path, authority.authority_employer_check, route.route);
});

module.exports = router;