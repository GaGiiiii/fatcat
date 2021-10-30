const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  // dialectOptions: { useUTC: false },
  timezone: "+02:00"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.reports = require("./report.model")(sequelize, Sequelize);
db.users = require("./user.model")(sequelize, Sequelize);

db.users.hasMany(db.reports);
db.reports.belongsTo(db.users);

module.exports = db;