import { Router } from "express";
import { comQValidate, comValidate } from "../utils/validatorMethod.mjs";
import { matchedData, param, validationResult } from "express-validator";
import { commonError } from "../utils/error-creator.mjs";
import database from "../db/db.mjs";

const profileRouter = Router();

//get all profiles
profileRouter.get("/all", async (_, res) => {
  try {
    const profiles = await database.profile.findMany({
      select: {
        Image: true,
        AccountDetails: {
          select: {
            Name: true,
            Username: true,
          },
        },
      },
    });
    // const flattened = profiles.map((p) => ({
    //   Image: p.Image,
    //   Name: p.AccountDetails?.Name ?? null,
    //   Username: p.AccountDetails?.Username ?? null,
    // }));
    return res.status(200).json({
      msg: "all profiles",
      error: null,
      data: profiles,
      // data: flattened,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error",
      error: "database error",
      data: null,
    });
  }
});

//get profile by id
profileRouter.get(
  "/:id",
  param("id").isInt().withMessage("Enter id as number"),
  param("id").notEmpty().withMessage("ID is required"),
  async (req, res) => {
    const error = validationResult(req);
    const err = commonError(error.array());
    if (error.array().length) {
      return res.status(400).json({
        msg: "error",
        error: err,
        data: null,
      });
    }
    const data = matchedData(req);
    console.log(data);
    try {
      const profile = await database.profile.findUnique({
        where: {
          Id: Number(data.id),
        },
        select: {
          Image: true,
          AccountDetails: {
            select: {
              Name: true,
              Username: true,
            },
          },
        },
      });
      // const flattened = profiles.map((p) => ({
      //   Image: p.Image,
      //   Name: p.AccountDetails?.Name ?? null,
      //   Username: p.AccountDetails?.Username ?? null,
      // }));
      return res.status(200).json({
        msg: "profile",
        error: null,
        data: profile,
        // data: flattened,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }
  }
);

//create new profile
profileRouter.post(
  "/create-profile",
  comQValidate("UserId"),
  comValidate("Image"),
  async (req, res) => {
    const error = validationResult(req);
    const err = commonError(error.array());
    if (error.array().length) {
      return res.status(400).json({
        msg: "error",
        error: err,
        data: null,
      });
    }
    const data = matchedData(req);
    console.log(data);

    try {
      const newProfile = await database.profile.create({
        data: {
          UserId: Number(data.UserId),
          Image: data.Image,
        },
      });
      return res.status(201).json({
        msg: "new profile created",
        error: null,
        data: newProfile,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }
  }
);

//update profile
profileRouter.put(
  "/update",
  comValidate("Image"),
  comQValidate("userId"),
  async (req, res) => {
    const error = validationResult(req);
    const err = commonError(error.array());
    const data = matchedData(req);
    console.log(data);
    if (error.array().length) {
      return res.status(400).json({
        msg: "error",
        error: err,
        data: null,
      });
    }
    try {
      const newProfile = await database.profile.update({
        where: {
          UserId: Number(data.userId),
        },
        data: {
          Image: data.Image,
        },
      });
      return res.status(201).json({
        msg: "new profile created",
        error: null,
        data: newProfile,
      });
    } catch (error) {
      console.log(error);
      if (error.code === "P2025") {
        return res.status(404).json({
          msg: "error",
          error: "Profile not found",
          data: null,
        });
      }
      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }
  }
);

//delete profile
profileRouter.delete(
  "/delete/:userId",
  param("userId").isInt().withMessage("Enter userId as number"),
  param("userId").notEmpty().withMessage("userId is required"),
  async (req, res) => {
    const error = validationResult(req);
    const err = commonError(error.array());
    const data = matchedData(req);
    console.log(data);
    if (error.array().length) {
      return res.status(400).json({
        msg: "error",
        error: err,
        data: null,
      });
    }
    try {
      await database.profile.delete({
        where: {
          UserId: Number(data.userId),
        },
      });
      return res.status(200).json({
        msg: "profile deleted",
        error: null,
        data: "profile deleted",
      });
    } catch (error) {
      console.log(error);
      if (error.code === "P2025") {
        return res.status(404).json({
          msg: "error",
          error: "Profile not found",
          data: null,
        });
      }
      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }
  }
);

export default profileRouter;
