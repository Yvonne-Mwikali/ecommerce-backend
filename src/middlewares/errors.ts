import { NextFunction, Request, Response } from "express"
import { HttpException } from "../exceptions/root.mjs"

export const errorMiddleWare = (err:HttpException,req:Request,res:Response,next:NextFunction)=>{
    const status=err.statusCode||500
    const message=err.message||"Internal Server Error"
    const errorCode=err.errorCode||1007
    const error=err.error||null
    res.status(status).json({
        status,
        message,
        errorCode,
        error
    })
}