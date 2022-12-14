const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const port = process.env.PORT || 5000;
require("./db/conn");
// DATABASE_URI=mongodb://localhost:27017/rutine_handler
// DATABASE_URI=mongodb+srv://db:6O3rHBpJYYLnGjbV@database.l2fnk.mongodb.net/rutine_handler?retryWrites=true&w=majority
// "dev": "nodemon app.js -e js,html,css"

app.use(express.static(path.join(__dirname, "public")));

// parser the body
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
// set cookie parser
app.use(cookieParser());

// add routes path
app.use(require("./route"));

// add static file
// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(port, () => {
  console.log("listening on port at " + port);
});
