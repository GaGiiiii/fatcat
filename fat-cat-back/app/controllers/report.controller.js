const { sequelize } = require("../models");
const db = require("../models");
const Report = db.reports;
const Op = db.Sequelize.Op;

// Create Report =============================================================================
exports.create = (req, res) => {
  // Validate request
  if (!req.body.UserId) {
    res.status(400).send({
      message: "User not found."
    });
    return;
  }

  const report = {
    UserId: req.body.UserId,
    date: new Date().toLocaleString('en-US', { timeZone: 'Europe/Belgrade' }), // Should be removed, we have created_at
    // date: new Date(),
  };

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
// Create Report =============================================================================

// Find All =============================================================================
exports.findAll = (req, res) => {
  Report.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reports."
      });
    });
};
// Find All =============================================================================

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update Report =============================================================================
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
// Update Report =============================================================================