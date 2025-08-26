import { Router } from "express";
import { usersInfo } from "../data/user-info.mjs";

const userRouter = Router();

//get all users
userRouter.get("/all-user", (_, res) => {
  res.status(200).json({
    msg: "user data",
    data: usersInfo,
  });
});

//get user by id
userRouter.get("/by-id", (req, res) => {
  const { id } = req.query;
  if (id !== undefined && id !== "") {
    const user = usersInfo.find((u) => u.id === Number(id));
    return res.status(200).json({
      msg: "user data",
      data: user,
    });
  }
  return res.status(400).json({
    msg: "user not found",
    data: null,
  });
});

export default userRouter;
