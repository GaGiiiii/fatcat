const { sequelize } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// getReports =============================================================================
/*
If days query param is provided we will return reports from last x days, if not we will return all reports
*/
exports.getReports = (req, res) => {
  if (req.query.days) {
    sequelize.query(`SELECT * FROM reports r WHERE r.createdAt >= DATE_ADD(CURDATE(), INTERVAL -${req.query.days} DAY) AND UserId = 1 ORDER BY createdAt ASC`, null, { raw: true }).then(data => {
      res.send(data[0]);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reports."
      });
    });
  } else {
    sequelize.query('SELECT * FROM `reports` r WHERE UserId = 1 ORDER BY createdAt ASC', null, { raw: true }).then(data => {
      res.send(data[0]);
    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reports."
      });
    });
  }
};
// getReports =============================================================================

