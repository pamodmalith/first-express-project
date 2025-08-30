import { body, param, query } from "express-validator";

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

export const comBValidate = (...keys) => {
  const bodyVal = [];
  keys.forEach((k) => {
    bodyVal.push(body(k).notEmpty().withMessage(`${k} is required`));
  });
  return bodyVal;
};

export const comQValidate = (...keys) => {
  const queryVal = [];
  keys.forEach((k) => {
    queryVal.push(query(k).notEmpty().withMessage(`${k} is required`));
  });
  return queryVal;
};

export const comPValidate = (...keys) => {
  const pathVal = [];
  keys.forEach((k) => {
    pathVal.push(
      param(k).notEmpty().isNumeric().withMessage(`${k} should be number`)
    );
  });
  return pathVal;
};
