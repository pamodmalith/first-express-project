import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";
import testRouter from "./test.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/test", testRouter);

export default rootRouter;
