module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "fatcatdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: { useUTC: false },
  timezone: "+02:00"
};