import express from "express";
import rootRouter from "./src/router/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import database from "./src/db/db.mjs";

const server = express();

server.use(express.json());
server.use(cookieParser("mykey"));
server.use(
  session({
    secret: "mykey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 10, httpOnly: true },
    store: new PrismaSessionStore(database, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
server.use("/api/v2", rootRouter);

server.listen(4000, () => console.log("Server is running"));
