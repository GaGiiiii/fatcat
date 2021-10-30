const { sequelize } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
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

