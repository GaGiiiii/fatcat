module.exports = app => {
  const users = require("../controllers/user.controller");
  let router = require("express").Router();

  // Login user
  router.post('/login', users.login);

  app.use('/api', router);
};