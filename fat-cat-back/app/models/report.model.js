module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define("report", {
    date: {
      type: Sequelize.DATE
    },
  });

  return Report;
};