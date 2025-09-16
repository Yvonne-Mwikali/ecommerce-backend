import { hashSync } from "bcrypt";
import type { Request, Response } from "express";
import { prismaClient } from "../index.js";
export const login = (req: Request, res: Response) => {
    res.send("Login endpoint")
}
export const signUp=async (req:Request,res:Response)=>{
    const{email,password,name}=req.body
    let user=await prismaClient.user.findFirst({where:{email}})
    if (user){
        throw Error("user already exist")
    }
    user=await prismaClient.user.create({
        data:{
            name,email,password:hashSync(password,10)
        }
    })
    res.json(user)
}