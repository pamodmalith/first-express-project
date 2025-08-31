import express from "express";
import rootRouter from "./src/router/index.mjs";
import cookieParser from "cookie-parser";

const server = express();

server.use(express.json());
server.use(cookieParser("mykey"));
server.use("/api/v2", rootRouter);

server.listen(4000, () => console.log("Server is running"));
