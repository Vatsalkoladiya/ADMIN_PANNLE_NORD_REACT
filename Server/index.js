import express from "express";
import mongoose  from "mongoose";
import cors from "cors";
import routes from "./routes/User.js";


const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/",routes);

const PORT = 5000;

const CONNECTION_URL = "mongodb://localhost:27017/details";
mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    // app.listen(PORT, () => console.log(`Server running on Port : ${PORT}`))
    console.log("mongoos start")
  )
  .catch((error) => console.log(error.message));

app.listen(PORT, () => console.log(`Server running on Port : ${PORT}`));