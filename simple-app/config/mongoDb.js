const mongoose = require('mongoose');

const dbConnect = () => { mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("connected to database !");
  })
  .catch(() => console.log("database connection error !"));

};

module.exports = dbConnect;