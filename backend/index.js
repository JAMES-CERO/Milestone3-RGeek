// Modules and Globals
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path")

// Express Settings
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));


// Listen for Connections
app.listen(process.env.PORT, () => {
    console.log(`Listening on ${process.env.PORT}`);
  });
  