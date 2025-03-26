import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import auth from "./api/auth";
import mongoose from "mongoose";
import maps from "./api/maps";
import report from "./api/report";

const port = 8001;

dotenv.config();

const dbURI = `${process.env.MONGO_URI}`;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

app.use("/api/auth", auth);
app.use("/api/maps", maps);
app.use("/api/report", report);

mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
    server.listen(port);
    console.log("HTTP server running at " + port);
  })
  .catch((err) => console.log(err));
