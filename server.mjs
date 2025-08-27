import express from "express";
import userRouter from "./src/router/user.mjs";
import productRouter from "./src/router/product.mjs";

const server = express();

server.use(express.json());
server.use("/api/v1/user", userRouter);
server.use("/api/v1/product", productRouter);

server.listen(4000, () => console.log("Server is running"));
