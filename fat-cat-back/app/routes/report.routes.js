module.exports = app => {
  const reports = require("../controllers/report.controller");
  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/", reports.create);

  // Retrieve all Tutorials
  router.get("/", reports.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", tutorials.findAllPublished);

  // // Retrieve a single Tutorial with id
  // router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", reports.update);

  // // Delete a Tutorial with id
  // router.delete("/:id", tutorials.delete);

  // // Delete all Tutorials
  // router.delete("/", tutorials.deleteAll);

  app.use('/api/reports', router);
};