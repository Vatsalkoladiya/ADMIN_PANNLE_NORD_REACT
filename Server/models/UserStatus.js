import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  date: String,
  checkin: String,
  chekout: String,
  work: String,
  status: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "UserData" },
});

const UserStatus = mongoose.model("UserStatus", userSchema);
export default UserStatus;
