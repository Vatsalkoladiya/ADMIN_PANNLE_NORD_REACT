import UserData from "../models/UserData";
import UserStatus from "../models/UserStatus";
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
    // console.log("token", userData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  res.send("THIS WORKS!");
};

export const getUserDetailsWithRoll = async (req, res) => {
  try {
    const maintoken = req.params.token;
    const access = maintoken.substring(1);
    const userData = await UserData.findOne({ accesstoken: access });
    console.log("tokenNew", userData);
    if (userData.rollpermission === "USER") {
      res.status(200).json(userData);
    } else {
      const userDataAll = await UserData.find();
      res.status(200).json(userDataAll);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  // res.send("THIS WORKS!");
};
export const createUser = async (req, res) => {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    const user = req.body;
    const email = await UserData.findOne({ email: user.email });
    if (email) {
      return res.status(200).json("User is already exits");
    }
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

export const userCheckIn = async (req, res) => {
  const maintoken = req.body.token;
  // const access = maintoken.substring(1);
  const userToken = await UserData.findOne({ accesstoken: maintoken });
  if (!userToken) {
    return res.status(200).json("User not found");
  }
  try {
    req.body.dataObj.author = userToken._id;
    const bodydata = req.body.dataObj;
    console.log("bodyData", bodydata);
    const newUserStatus = new UserStatus(bodydata);
    await newUserStatus.save();
    res.status(201).json({ message: "User CheckedIn", data: newUserStatus });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export const getUserCheckIn = async (req, res) => {
  const token = req.params.token;
  const access = token.substring(1);
  const userData = await UserData.findOne({ accesstoken: access });
  console.log("user", userData);
  if (!userData) return res.status(201).send("User not found");
  try {
    const userSatusAll = await UserStatus.find({ author: userData._id });
    res.status(200).json(userSatusAll);
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export const userCheckOut = async (req, res) => {
  const maintoken = req.body.token;
  const userToken = await UserData.findOne({ accesstoken: maintoken });
  if (!userToken) {
    return res.status(200).json("User not found");
  }
  // const id = userToken._id;
  //   if (!mongoose.Types.ObjectId.isValid(id))
  //     return res.status(404).send("No post with that id");
  try {
    // req.body.dataOutObj.author = userToken._id;
    const id = userToken._id;
    const bodydata = req.body.dataOutObj;
    console.log("bodyData", id);
    const newUserStatus = await UserStatus.findOneAndUpdate({ author: id }, bodydata);
    // await newUserStatus.save();
    res.status(201).json({ message: "User CheckedIn", data: newUserStatus });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
export const getUserCheckOut = async (req, res) => {
  const token = req.params.token;
  const access = token.substring(1);
  const userData = await UserData.findOne({ accesstoken: access });
  console.log("user", userData);
  if (!userData) return res.status(201).send("User not found");
  try {
    const userSatusAll = await UserStatus.find({ author: userData._id });
    res.status(200).json(userSatusAll);
  } catch (error) {
    res.status(401).json({ message: error });
  }
};
