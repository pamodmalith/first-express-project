import { Router } from "express";
import { validationResult } from "express-validator";
import { validatorMethod } from "../utils/validatorMethod.mjs";

const testRouter = Router();

testRouter.get("/abc", validatorMethod, (req, res) => {
  const r = validationResult(req);
  console.log(r.array());
  if (r.array().length) return res.status(400).json({ errors: r.array() });

  res.sendStatus(200);
});

export default testRouter;
