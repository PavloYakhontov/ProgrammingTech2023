require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");
var cors = require('cors')

const app = express();

app.use(cors());
app.use(express.json());

// importing user context
const User = require("./model/user");
const Scoreboard = require("./model/scoreboard");

// Register
app.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      username,
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

// Login
app.post("/login", async (req, res) => {

  // Our login logic starts here
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, username },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/scoreboard", auth, async (req, res) => {
  try {
    // Get user input
    const { score } = req.body;
    const decodedToken = jwt.decode(req.body.token);
    const username = decodedToken.username;
    // Validate user input
    if (!(username && score)) {
      res.status(400).send("All input is required");
    }

    const newscore = await Scoreboard.create({
      username,
      score
    });

    res.status(200).json(newscore);
  } catch (err) {
    console.log(err);
  }
});

app.get("/scoreboard", async (req, res) => {
  try {
    const top = await Scoreboard.find().sort({ score: -1 }).limit(5);
    res.status(200).json(top);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
});

module.exports = app;