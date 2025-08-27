import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);

export default rootRouter;
