/*jslint node: true */
'use strict';
const path = require("path");

module.exports = function (app) {
  var router = app.loopback.Router();
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
  app.use(router)
};