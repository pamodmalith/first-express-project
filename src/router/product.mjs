import { Router } from "express";
import {
  comQValidate,
  comBValidate,
  comPValidate,
} from "../utils/validatorMethod.mjs";
import database from "../db/db.mjs";
import { matchedData, validationResult } from "express-validator";
import { commonError } from "../utils/error-creator.mjs";

const productRouter = Router();

//get all product
productRouter.get("/all", async (_, res) => {
  try {
    const products = await database.product.findMany({
      select: {
        Name: true,
        User: {
          select: {
            Name: true,
            Username: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "all products",
      error: null,
      data: products,
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

//get products by user
productRouter.get("/all-by-user", comQValidate("userId"), async (req, res) => {
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
    const allProducts = await database.product.findMany({
      where: {
        UserId: Number(data.userId),
      },
      select: {
        Name: true,
        User: {
          select: {
            Name: true,
            Username: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg:
        allProducts.length > 0
          ? `products for ${allProducts[0]?.User?.Name ?? "Unknown"}`
          : "No products found",
      error: null,
      data: allProducts,
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

//get product by id
productRouter.get("/:id", comPValidate("id"), async (req, res) => {
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
    const product = await database.product.findUnique({
      where: {
        Id: Number(data.id),
      },
      select: {
        Name: true,
        User: {
          select: {
            Name: true,
            Username: true,
          },
        },
      },
    });
    return res.status(200).json({
      msg: "product",
      error: null,
      data: product,
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

//create product
productRouter.post(
  "/create-product",
  comBValidate("Name", "UserId"),
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
      const newPost = await database.product.create({
        data: {
          UserId: Number(data.UserId),
          Name: data.Name,
        },
      });
      return res.status(201).json({
        msg: "new post created",
        error: null,
        data: newPost,
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

//update product
productRouter.put(
  "/update/:id",
  comPValidate("id"),
  comBValidate("Name", "UserId"),
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
      const newProduct = await database.product.update({
        where: {
          Id: Number(data.id),
        },
        data: {
          Name: data.Name,
          UserId: Number(data.UserId),
        },
      });
      return res.status(200).json({
        msg: "product updated",
        error: null,
        data: newProduct,
      });
    } catch (error) {
      console.log(error);
      if (error.code === "P2025") {
        return res.status(404).json({
          msg: "error",
          error: "Product not found",
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

//delete product
productRouter.delete("/delete/:id", comPValidate("id"), async (req, res) => {
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
    const deletedProduct = await database.product.delete({
      where: {
        Id: Number(data.id),
      },
      select: {
        Name: true,
      },
    });
    return res.status(200).json({
      msg: "product deleted",
      error: null,
      data: `${deletedProduct.Name}'s product deleted`,
    });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
      return res.status(404).json({
        msg: "error",
        error: "Product not found",
        data: null,
      });
    }
    return res.status(500).json({
      msg: "error",
      error: "database error",
      data: null,
    });
  }
});

export default productRouter;
