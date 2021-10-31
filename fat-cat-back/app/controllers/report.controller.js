const { sequelize } = require("../models");
const db = require("../models");
const Report = db.reports;
const Op = db.Sequelize.Op;

// Create Report =============================================================================
exports.create = (req, res) => {
  // Validate request
  if (!req.body.UserId) {
    return res.status(400).json({
      message: "User not found.",
      report: null,
    });
  }

  const report = {
    UserId: req.body.UserId,
    date: new Date().toLocaleString('en-US', { timeZone: 'Europe/Belgrade' }), // Should be removed, we have created_at
    // date: new Date(),
  };

  Report.create(report)
    .then(data => {
      return res.status(200).json({
        report: data,
        message: 'Report created',
      });
    })
    .catch(err => {
      return res.status(500).json({
        message: err.message || "Some error occurred while creating the Report."
      });
    });
};
// Create Report =============================================================================

// Find All =============================================================================
exports.findAll = (req, res) => {
  Report.findAll()
    .then(data => {
      return res.status(200).json({ reports: data, message: 'Reports found' });
    })
    .catch(err => {
      return res.status(500).json({
        message: err.message || "Some error occurred while retrieving reports."
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

  try {
    const report = await Report.findOne({ where: { id: id } });
    if (report === null) {
      return res.status(500).json({
        message: "Not found",
        report: null
      });
    }

    report.changed('updatedAt', true);
    report.save();
    res.status(200).json({ report, message: "Report updated" });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
      report: null
    });
  }
};
// Update Report =============================================================================