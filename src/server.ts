import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import path from "path";
import router from "./routes";
import passport from "passport";
import { localStrategyPassport } from "./libs/passport-local";

dotenv.config();

const server = express();
server.use(express.json());
server.use(helmet());
passport.use(localStrategyPassport);
server.use(passport.initialize());
server.use(express.static(path.join(__dirname, "public")));
server.use(router);
const PORT = process.env.PORT;
console.log(localStrategyPassport);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
