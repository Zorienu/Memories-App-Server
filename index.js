import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postsRoutes from "./routes/posts.js";

const app = express();

app.use("/posts", postsRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true })); // we're gonna send images, they can be large
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // we're gonna send images, they can be large
app.use(cors());

console.log("connecting to db");
const MONGO_URI =
  "mongodb://zorienu:java1094@cluster0-shard-00-00.w3vb3.mongodb.net:27017,cluster0-shard-00-01.w3vb3.mongodb.net:27017,cluster0-shard-00-02.w3vb3.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-g4fd07-shard-0&authSource=admin&retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running in port: ${PORT}`)))
  .catch((err) => console.log(err.message));

mongoose.set("useFindAndModify", false); // makes sure we don't get any warning in the console
