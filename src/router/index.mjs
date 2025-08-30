import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";
import testRouter from "./test.mjs";
import profileRouter from "./profile.mjs";
import { checkAuth } from "../utils/auth-middleware.mjs";
import categoryRouter from "./category.mjs";

const rootRouter = Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/profile", checkAuth, profileRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/test", testRouter);

export default rootRouter;
