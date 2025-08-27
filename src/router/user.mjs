import { Router } from "express";
import { usersInfo } from "../data/user-info.mjs";
import database from "../db/db.mjs";

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

userRouter.post("/create-user", async (req, res) => {
  const userData = req.body;
  try {
    await database.user.create({
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error",
      data: null,
    });
  }
  console.log(userData);
  res.sendStatus(201);
});

export default userRouter;
