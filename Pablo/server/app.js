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
const Post = require("./model/post");

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
      username
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
    user.password = '';
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

app.get("/posts", async (req, res) => {
  res.set("page", req.headers.page);
  res.set("pageSize", req.headers.pageSize);
  res.set("totalItems", await Post.countDocuments());

  res.status(200).json(await Post.find().skip((req.headers.page - 1) * req.headers.pagesize).limit(req.headers.page * req.headers.pagesize));
})

app.get("/posts/info", async (req, res) => {
  try {
    let pagination = { page: Number, pageSize: Number, totalItems: Number };
    pagination.page = req.body.page;
    pagination.pageSize = req.body.pageSize;
    pagination.totalItems = await Post.countDocuments();
    res.status(200).json(pagination);
  } catch (error) {
    console.log(error);
  }
})

app.post("/posts", auth, async (req, res) => {
  try {
    const { post } = req.body;
    post.publishedOn = Date.now();
    const newPost = await Post.create(post)
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
  }
})

app.get("/posts/stats", async (req, res) => {
  try {
    res.status(200).json({ candidates: await User.count(), posts: await Post.count() });
  } catch (error) {
    console.log(error);
  }
})

app.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params['id']);
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
})



module.exports = app;