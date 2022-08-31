const app = require('./app');

// const webSocket = require('./socket');

const server=app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});

// webSocket(server, app);