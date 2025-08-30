import { Router } from "express";
import {
  comQValidate,
  comBValidate,
  comPValidate,
} from "../utils/validatorMethod.mjs";
import { matchedData, param, validationResult } from "express-validator";
import { commonError } from "../utils/error-creator.mjs";
import database from "../db/db.mjs";

const categoryRouter = Router();

//get all categories
categoryRouter.get("/all", async (_, res) => {
  try {
    const categories = await database.category.findMany({});
    return res.status(200).json({
      msg: "all categories",
      error: null,
      data: categories,
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

//get category by id
categoryRouter.get(
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
      const category = await database.category.findUnique({
        where: {
          Id: Number(data.id),
        },
      });
      return res.status(200).json({
        msg: "category",
        error: null,
        data: category,
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

//create new category
categoryRouter.post(
  "/create",
  comBValidate("Name", "UserId", "ProductIds"),
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
      const newCategory = await database.category.create({
        data: {
          Name: data.Name,
          Products: {
            connect: `${data.ProductIds}`.split(",").map((categoryId) => ({
              Id: Number(categoryId),
            })),
          },
        },
      });
      return res.status(201).json({
        msg: "new category created",
        error: null,
        data: newCategory,
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
categoryRouter.put(
  "/update/:id",
  comPValidate("id"),
  comBValidate("Name", "ProductIds"),
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
      const updatedCategory = await database.category.update({
        where: {
          Id: Number(data.id),
        },
        data: {
          Name: data.Name,
          Products: {
            connect: `${data.ProductIds}`.split(",").map((categoryId) => ({
              Id: Number(categoryId),
            })),
          },
        },
      });
      return res.status(200).json({
        msg: "category updated",
        error: null,
        data: updatedCategory,
      });
    } catch (error) {
      console.log(error);
      if (error.code === "P2025") {
        return res.status(404).json({
          msg: "error",
          error: "Category not found",
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

//delete category
categoryRouter.delete(
  "/delete/:userId",
  comPValidate("userId"),
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
      const deletedCategory = await database.category.delete({
        where: {
          UserId: Number(data.userId),
        },
        select: {
          Name: true,
        },
      });
      return res.status(200).json({
        msg: "category deleted",
        error: null,
        data: `${deletedCategory.Name} category deleted`,
      });
    } catch (error) {
      console.log(error);
      if (error.code === "P2025") {
        return res.status(404).json({
          msg: "error",
          error: "category not found",
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

export default categoryRouter;
