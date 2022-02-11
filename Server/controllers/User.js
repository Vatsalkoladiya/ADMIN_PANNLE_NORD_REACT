import UserData from "../models/UserData";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginuser = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const { email, password } = req.body;
    const userDetail = await UserData.findOne({ email });
    const isMatch = bcrypt.compareSync(password, userDetail.password);
    if (isMatch) {
      let token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
        expiresIn: 18000,
      });
      await UserData.updateOne({ email }, { accesstoken: token });
      res
        .status(200)
        .send({ auth: true, accesstoken: token, detail: userDetail });
    } else {
      res.status(201).send({ message: "Email OR Password is not match" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message || "data does not exist" });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const userData = await UserData.find();
    res.status(200).json(userData);
    console.log('token', userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  res.send("THIS WORKS!");
};

export const createUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const user = req.body;
    const newUser = new UserData(user);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No UserData With Id");
  await UserData.findByIdAndDelete(id);
  res.json({ message: "UserData Delete SuccessFully" });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  req.body.password = bcrypt.hashSync(req.body.password, 8);
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const userData = await UserData.findByIdAndUpdate({ _id: id }, user, {
    new: true,
  });
  res.json(userData);
};
