import { ErrorCodes, HttpException } from "./root.mjs";

export class BadRequest extends HttpException{
    constructor(message:string="Bad Request",errorCode:ErrorCodes){
        super(message,400,errorCode,null)
        }
}