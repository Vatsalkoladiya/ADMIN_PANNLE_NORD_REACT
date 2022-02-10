import express from "express";
import {
  getUserDetails,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/User";

const routes = express.Router();


routes.get("/getuser", getUserDetails);
routes.post("/createuser", createUser);
routes.delete('/deleteuser/:id', deleteUser);
routes.put("/updateuser/:id", updateUser);
export default routes;
