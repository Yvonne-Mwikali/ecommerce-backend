import type { Express } from "express";
import express from "express";
import rootRouter from "./src/routes/index.mjs";
import { PORT } from "./src/secrets.mjs";
import { PrismaClient } from "./src/generated/prisma/index.js";
import { errorMiddleWare } from "./src/middlewares/errors.js";
import { signUpSchema } from "./src/schema/users.js";
const app:Express = express()
app.use(express.json())
app.use("/api",rootRouter)
app.use(errorMiddleWare)
export const prismaClient=new PrismaClient({
    log:["query"]
}).$extends ({
  query: {
    user: {
      create({args,query}){
args.data=signUpSchema.parse(args.data)
        return query(args)
        
      }}}})
     

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000")
})