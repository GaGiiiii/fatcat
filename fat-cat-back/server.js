const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./app/models');

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }); // Force true restarts DB

// Routes ================================================================================
require('./app/routes/report.routes')(app);
require('./app/routes/user.routes')(app);
// Routes ================================================================================


// Start App =============================================================================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// Start App =============================================================================