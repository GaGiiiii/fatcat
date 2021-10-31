const verifyToken = require("../middlewares/auth.middleware");

module.exports = app => {
  const users = require("../controllers/user.controller");
  let router = require("express").Router();

  // Get Reports For User
  router.get("/:id/reports", verifyToken, users.getReports);

  app.use('/api/users', router);
};