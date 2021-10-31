const { sequelize } = require("../models");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// getReports =============================================================================
/*
If days query param is provided we will return reports from last x days, if not we will return all reports
*/
exports.getReports = (req, res) => {
  try {
    const authData = jwt.verify(req.token, 'secretkey');
    console.log(authData);

    if (req.query.days) {
      sequelize.query(`SELECT * FROM reports r WHERE r.createdAt >= DATE_ADD(CURDATE(), INTERVAL -${req.query.days} DAY) AND userId = ${authData.user.id} AND r.createdAt != r.updatedAt ORDER BY createdAt ASC`, null, { raw: true }).then(data => {
        return res.status(200).json({
          reports: data[0],
          message: "Reports found"
        });
      }).catch(err => {
        return res.status(500).json({
          message: err.message || "Some error occurred while retrieving reports."
        });
      });
    } else {
      sequelize.query(`SELECT * FROM reports r WHERE userId = ${authData.user.id} ORDER BY createdAt ASC`, null, { raw: true }).then(data => {
        return res.status(200).json({
          reports: data[0],
          message: "Reports found"
        });
      }).catch(err => {
        res.status(500).json({
          message: err.message || "Some error occurred while retrieving reports."
        });
      });
    }

  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized',
      reports: null,
    })
  }
};
// getReports =============================================================================

// login =============================================================================
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(401).json({
      user: null,
      message: 'Wrong combination'
    });
  }


  try {
    const user = (await User.findAll({
      where: {
        email: email,
      },
    }))[0];

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(401).json({
          user: null,
          message: "Wrong Combination."
        });
      }

      const token = jwt.sign({ user }, 'secretkey'); // Todo Expire Token
      user.password = null;
      return res.status(200).json({
        user,
        token,
        message: 'Login Success'
      });
    } else {
      return res.status(401).json({
        user: null,
        message: "User doesn't exist."
      });
    }
  } catch (err) {
    return res.status(500).json({
      user: null,
      message: err.message
    });
  }
};
// login =============================================================================

// register =============================================================================
exports.register = async (req, res) => {
  const fullname = req.body.fullname;
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !fullname) {
    return res.status(401).json({
      user: null,
      message: 'Empty inputs'
    });
  }

  try {
    const saltRounds = 10;
    const hashedPW = await bcrypt.hash(password, saltRounds);

    const user = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPW,
    };

    const data = await User.create(user);
    const token = jwt.sign({ user: data }, 'secretkey'); // Todo Expire Token

    return res.status(200).json({
      user: data,
      token,
      message: 'User created',
    });
  } catch (error) {
    return res.status(500).json({
      user: null,
      message: error.message
    });
  }
};
// register =============================================================================

// isLoggedIn =============================================================================
exports.isLoggedIn = async (req, res) => {
  try {
    const authData = jwt.verify(req.token, 'secretkey');
    authData.user.password = null;
    return res.status(200).json({
      message: 'User is logged in',
      user: authData.user
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthenticated',
      user: null
    });
  }
};
// isLoggedIn =============================================================================
