import { Router } from "express";
import { usersInfo } from "../data/user-info.mjs";
import database from "../db/db.mjs";

const userRouter = Router();

//get all users
userRouter.get("/all-user", async (_, res) => {
  try {
    const userData = await database.user.findMany();
    return res.status(200).json({
      msg: "user data",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error",
      error: "internal server error",
      data: null,
    });
  }
});

//get user by id
userRouter.get("/by-id", async (req, res) => {
  const { id } = req.query;
  if (id !== undefined && id !== "") {
    try {
      const userData = await database.user.findUnique({
        where: {
          Id: Number(id),
        },
      });
      if (!userData) {
        return res.status(404).json({
          msg: "user not found",
          data: null,
        });
      }
      return res.status(200).json({
        msg: "user data",
        data: userData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "error",
        error: "internal server error",
        data: null,
      });
    }
  }
  return res.status(400).json({
    msg: "some error",
    data: null,
  });
});

//create user
userRouter.post("/create-user", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await database.user.create({ data: userData });
    return res.status(201).json({
      msg: "user data",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "internal server error",
      data: null,
    });
  }
});

//update user
userRouter.put("/update-user", async (req, res) => {
  const { id } = req.query;
  const userData = req.body;
  if (id !== undefined && id !== "") {
    try {
      const updatedUserData = await database.user.update({
        where: {
          Id: Number(id),
        },
        data: userData,
      });
      return res.status(200).json({
        msg: "user data",
        data: updatedUserData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "internal server error",
        data: null,
      });
    }
  }
  return res.status(400).json({
    msg: "error",
    error: "your error message",
    data: null,
  });
});

//delete user
userRouter.delete("/delete-user/:id", async (req, res) => {
  const { id: userId } = req.params;
  if (userId !== undefined && userId !== "") {
    try {
      await database.user.delete({
        where: {
          Id: Number(userId),
        },
      });
      return res.status(200).json({
        msg: "user deleted",
        data: userId,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "internal server error",
        data: null,
      });
    }
  }
  return res.status(400).json({
    msg: "error",
    error: "your error message",
    data: null,
  });
});

export default userRouter;
