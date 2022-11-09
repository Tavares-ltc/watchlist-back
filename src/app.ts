import express from "express";
import cors from "cors";
import dotenv from "dotenv"

const server = express();
server.use(express.json());
server.use(cors());
dotenv.config();

const PORT = process.env.PORT;

server.get("/", (req, res) => {
  res.send("ok");
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
