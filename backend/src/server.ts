import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";

const port = 8001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
