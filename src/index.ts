import type { Express } from "express";
import express from "express";
import rootRouter from "./routes/index.js";
import { PORT } from "./secrets.js";
import { PrismaClient } from "./generated/prisma/index.js";
const app:Express = express()
app.use("/api",rootRouter)
export const prismaClient=new PrismaClient({
    log:["query"]
})
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000")
})