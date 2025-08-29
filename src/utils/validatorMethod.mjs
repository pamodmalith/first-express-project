import { body, query } from "express-validator";

export const validatorMethod = [
  query("name").isEmail().withMessage("Name should be a valid email"),
  query("age").isInt({ min: 0 }).withMessage("Age must be a positive integer"),
];

export const registerValidate = [
  body("Username").notEmpty().withMessage("Username is required"),
  body("Password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("Password must be strong"),
  body("Name").notEmpty().withMessage("Name is required"),
];

export const commonValidate = (...keys) => {
  const commonVal = [];
  keys.forEach((k) => {
    commonVal.push(body(k).notEmpty().withMessage(`${k} is required`));
  });
  return commonVal;
};
