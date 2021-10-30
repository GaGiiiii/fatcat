module.exports = app => {
  const users = require("../controllers/user.controller");
  let router = require("express").Router();

  // Create a new Tutorial
  router.get("/:id/reports", users.getReports);

  // Create a new Tutorial
  // router.post("/", users.create);

  // // Retrieve all Tutorials
  // router.get("/", users.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  // router.put("/:id", reports.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  app.use('/api/users', router);
};