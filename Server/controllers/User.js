import UserData from "../models/UserData";
import mongoose from "mongoose";

export const getUserDetails = async (req, res) => {
  try {
    const userData = await UserData.find();
    res.status(200).json(userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  res.send("THIS WORKS!");
};

export const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new UserData(user);
  try {
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
  const user = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const userData = await UserData.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  res.json(userData);
};
