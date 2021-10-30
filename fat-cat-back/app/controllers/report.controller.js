const { sequelize } = require("../models");
const db = require("../models");
const Report = db.reports;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.UserId) {
    res.status(400).send({
      message: "User not found."
    });
    return;
  }

  // Create a Tutorial
  const report = {
    UserId: req.body.UserId,
    date: new Date().toLocaleString('en-US', { timeZone: 'Europe/Belgrade' }),
    // date: new Date(),
  };

  console.log(report.date);

  // Save Tutorial in the database
  Report.create(report)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Report."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  sequelize.query('SELECT * FROM `reports` r WHERE r.createdAt >= DATE_ADD(CURDATE(), INTERVAL -1 DAY) ORDER BY createdAt DESC', null, { raw: true }).then(data => {
    res.send(data[0]);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving reports."
    });
  });

  // Report.findAll()
  //   .then(data => {
  //     res.send(data);
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message:
  //         err.message || "Some error occurred while retrieving reports."
  //     });
  //   });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  const report = await Report.findOne({ where: { id: id } });
  if (report === null) {
    res.send('Report not found');
  }

  report.changed('updatedAt', true);
  report.save();
  res.send(report);
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};