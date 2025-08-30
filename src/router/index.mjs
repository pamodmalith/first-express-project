import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";
import testRouter from "./test.mjs";
import profileRouter from "./profile.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/profile", profileRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/test", testRouter);

export default rootRouter;
