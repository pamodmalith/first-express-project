import { verifyToken } from "./jwt.mjs";

export const checkAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth === undefined) {
    return res.status(401).json({
      msg: "error",
      error: "token not found",
      data: null,
    });
  }
  if (auth.split(" ")[0] !== "pamod") {
    return res.status(400).json({
      msg: "error",
      error: "bad request",
      data: null,
    });
  }
  console.log(auth);

  const token = auth.split(" ")[1];

  const payload = verifyToken(token);

  if (payload === null) {
    return res.status(401).json({
      msg: "error",
      error: "token expired",
      data: null,
    });
  }

  next();
};
