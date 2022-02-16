import express from "express";
import {
  getUserDetails,
  createUser,
  deleteUser,
  updateUser,
  loginuser,
  getUserDetailsWithRoll,
  userCheckIn,
  userCheckOut,
  getUserCheckIn,
  getUserCheckOut,
} from "../controllers/User";

const routes = express.Router();

routes.post('/loginuser', loginuser);
routes.get("/getuser", getUserDetails);
routes.get("/getuser/:token", getUserDetailsWithRoll);
routes.post("/createuser", createUser);
routes.delete('/deleteuser/:id', deleteUser);
routes.put("/updateuser/:id", updateUser);
routes.post('/checkin', userCheckIn);
routes.get("/getcheckin:token", getUserCheckIn);
routes.post('/checkout', userCheckOut);
routes.get("/getcheckout:token", getUserCheckOut);
export default routes;
