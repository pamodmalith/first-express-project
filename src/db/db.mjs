import { PrismaClient } from "../generated/prisma/client.js";

const database = new PrismaClient();

export default database;
