import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });
    const savedUser = await newUser.save();
    consoel.log("SAVING USER RESPONSE", savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    console.log(`REGISTERATION ERROR: ${err}`);
    res.status(500).json({ error: err.message });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking user existance:
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({
        msg: `User with the email: ${email} does not exist!`,
      });

    // Matching passwords:
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      res.status(400).json({
        msg: "Invalid Credentials!",
      });

    // generating JWT:
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    console.log("TOKEN", token);

    // assigning ACCESS JWT to a user:
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    console.log(`LOGGING ERROR: ${err}`);
    res.status(500).json({ error: err.message });
  }
};