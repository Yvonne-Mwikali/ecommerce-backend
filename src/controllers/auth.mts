import { compareSync, hashSync } from "bcrypt";
import type { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { BadRequest } from "../exceptions/bad-request.mjs";
import { ErrorCodes } from "../exceptions/root.mjs";
import { prismaClient } from "../../index.mjs";
import { JWT_SECRET } from "../secrets.mjs";
import { UnprocessableEntity } from "../exceptions/validation.mjs";
import { signUpSchema } from "../schema/users.js";
export const signUp=async (req:Request,res:Response,next:NextFunction)=>{
    try{
        signUpSchema.parse(req.body)
  const{email,password,name}=req.body
    let user=await prismaClient.user.findFirst({where:{email}})
    if (user){
        next( new BadRequest("user already exists",ErrorCodes.USER_ALREADY_EXISTS)        )
    }
    user=await prismaClient.user.create({
        data:{
            name,email,password:hashSync(password,10)
        }
    })
    res.json(user)
    }catch(err:any){
        next(new UnprocessableEntity("validation error",err?.issue,ErrorCodes.VALIDATION_ERROR))
    }
  
}
export const login =async (req: Request, res: Response,next:NextFunction) => {
    const{email,password}=req.body
    let user=await prismaClient.user.findFirst({where:{email}})
    if (!user){
        next (new BadRequest("user not found",ErrorCodes.USER_NOT_FOUND))
        return;
    }
    const isPasswordValid=compareSync(password,user.password)
    if (!isPasswordValid){
        next (new BadRequest("invalid password",ErrorCodes.INVALID_CREDENTIALS))
    }
    const token=jwt.sign({id:user.id,email:user.email},JWT_SECRET ,{expiresIn:"1h"})
    res.json({user,token})
}