import User from "../model/User.js";
import bCrypt from "bcryptjs";

export const registerUserCtrl = async (req, res) => {
  const { fullname, email, password } = req.body;
  //   check if user exist
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({
      error: "User already exists.",
    });
  }
  //   hash the passwords
  const salt = await bCrypt.genSalt(10);
  const hashPassword = await bCrypt.hash(password, salt);
  // save the user
  const newUser = await User.create({
    email,
    password: hashPassword,
    fullname,
  });
  return res.status(201).json({
    user: newUser,
    message: "User Registered Successfull",
  });
};

export const loginUserCtrl = async (req, res) => {
  const { email, password } = req.body;
  // check if user is register in our database
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      error: "Invalid login details",
    });
  }
  // check if passwords match
  const isMatch = await bCrypt.compare(password, user.password);
  console.log(isMatch);
  if (!isMatch) {
    return res.status(400).json({
      error: "Passwords do not match",
    });
  }

  res.json({
    user,
    message: "Successfull login",
  });
};
