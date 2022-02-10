import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: String,
  mobile: String,
  password: String,
  gender: String,
});

const UserData = mongoose.model("UserData", userSchema);

export default UserData