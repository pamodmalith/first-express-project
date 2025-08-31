import { Router } from "express";
import { validationResult } from "express-validator";
import { validatorMethod } from "../utils/validatorMethod.mjs";

const testRouter = Router();

// testRouter.get("/abc", validatorMethod, (req, res) => {
//   const r = validationResult(req);
//   console.log(r.array());
//   if (r.array().length) return res.status(400).json({ errors: r.array() });

//   res.sendStatus(200);
// });

testRouter.get("/get-cookie", (req, res) => {
  res.cookie("pamodCookie", "cookieValue", {
    maxAge: 1000 * 30,
    httpOnly: true,
    signed: true,
  });
  res.cookie("pamodCookie2", "cookieValue2", {
    maxAge: 1000 * 60,
    httpOnly: true,
    signed: true,
  });
  res.sendStatus(200);
});

testRouter.get("/read-cookie", (req, res) => {
  console.log(req.signedCookies.pamodCookie);
  console.log(req.signedCookies["pamodCookie"]);
  console.log(req.headers.cookie);
  res.sendStatus(200);
});
testRouter.get("/get-session", (req, res) => {
  req.session["auk-session"] = { name: "Pamod", age: 24 };
  res.sendStatus(200);
});

testRouter.get("/read-session", (req, res) => {
  console.log(req.session);
  res.sendStatus(200);
});
export default testRouter;
