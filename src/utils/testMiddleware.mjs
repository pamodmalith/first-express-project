const testMiddleware = (req, res, next) => {
  console.log("Test middleware executed");
  next();
};

export default testMiddleware;
