'use strict';

const loopback = require('loopback'),
  boot = require('loopback-boot'),
  logger = require('./lib/logger'),
  path = require('path'),
  app = module.exports = loopback();

const http_port = process.env.HTTP_PORT || 3000,
  etcd_host = process.env.ETCD_HOST || "localhost",
  rabbit_host = process.env.BROCKER_HOST || "localhost",
  mongo_host = process.env.DBSOURCE_HOST || "localhost";

if (!process.env.ETCD_HOST) { logger.warn(`ETCD_HOST environment is not set, try default ${etcd_host}`); }

app.set("mongo_host", mongo_host);
app.set("http_port", http_port);
app.set("etcd_host", etcd_host);
app.set("ms_name", 'web');

if (process.env.NODE_ENV == 'development') {
  console.log('Running in dev mode'); 
}

app.use('/static',
  loopback.static(path.join(__dirname, '../dist'), { index: false }));

app.start = function () {
  // start the web server
  return app.listen(http_port, () => {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
