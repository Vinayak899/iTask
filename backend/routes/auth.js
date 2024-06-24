const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const fetchUser=require("../middleware/fetchUser")
const { body, validationResult } = require("express-validator");
const app = express();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "BhaiAiseHiHackThodiKrlegaTu";
// ROUTE 1: Create a user using post "/api/auth/createuser". No login required
app.post(
  "/createuser",
  [
    body("email").isEmail(),
    body("name", "sahi naam daal oye").isLength({ min: 2 }),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // if there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let success=false;
    // create whether the user with the same email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry the user with this email already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const securedPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securedPassword,
      });
      // creating a jwt token for the user so that we can verify the
      // user after he has logged into the webApp with the token and
      // do not have to ask for repeated logins
      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// ROUTE 2: Authenticate a user using post "/api/auth/login". No login required
app.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 8 })],
  async (req, res) => {
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }
      const data = {
        user: {
          id: user._id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success=true;
      res.json({ success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some Error Occured");
    }
  }
);

// ROUTE 3: Get logged in user details using post "/api/auth/getuser". Login required
app.post("/getuser", fetchUser, async (req, res) => {
  try {
    const user=await User.findById(req.user.id).select("-password")
    res.send(user);
  } catch (error) {
    res.status(500).send("Some Error Occured");
  }
});

module.exports = app;
