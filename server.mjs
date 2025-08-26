import express from "express";

const server = express();

server.get("/", (req, res) => {
  console.log(req);
  res.json({ msg: "Hello World!" });
});

server.get("/api/v1/hello", async (req, res) => {
  res.status(400);
  res.json({ msg: "Bad Request" });
});

server.listen(4000, () => console.log("Server is running"));
