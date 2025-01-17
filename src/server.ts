import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import router from "./routes";

dotenv.config();

const server = express();
server.use(express.json());
server.use(helmet());
server.use(express.static(path.join(__dirname, "public")));
server.use(router);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
