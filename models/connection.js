require('dotenv').config();
var mongoose = require("mongoose");

var user = process.env.USER_BDD;
var password = process.env.PASSWORD_BDD;
var dbname = process.env.BDD_NAME;
var clusterName = process.env.CLUSTER_NAME;
var URI_BDD = `mongodb+srv://${user}:${password}@${clusterName}/${dbname}`


var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(URI_BDD, options, function (err) {
  if (err) {
    console.log(`error, failed to connect to the database because --> ${err}`);
  } else {
    console.info("*** Database Parkmanager connection : Success ***");
  }
});

module.exports = mongoose;