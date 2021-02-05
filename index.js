import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postsRoutes from "./routes/posts.js";
import usersRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true })); // we're gonna send images, they can be large
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // we're gonna send images, they can be large
app.use(cors());

app.use("/posts", postsRoutes);
app.use("/user", usersRoutes);

app.use("/", (req, res) => res.send("Hello from heroku API"));

console.log("connecting to db");
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running in port: ${PORT}`)))
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false); // makes sure we don't get any warning in the console
