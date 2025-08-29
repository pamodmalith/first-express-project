import jwt from "jsonwebtoken";

export const tokenGen = (payload) => {
  const token = jwt.sign(payload, "mykey");
  return token;
};

export const decodeToken = (token) => {
  const payload = jwt.decode(token);
  return payload;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, "mykey");
    return decoded;
  } catch (error) {
    console.log(error);
    return null;
  }
};
