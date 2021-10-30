module.exports = (sequelize, Sequelize) => {
  const Report = sequelize.define("Report", {
    date: {
      type: Sequelize.DATE
    },
  });

  return Report;
};