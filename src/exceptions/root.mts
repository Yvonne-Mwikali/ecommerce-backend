//message ,status code ,error code ,error
export class HttpException extends Error{
    message:string
    statusCode:number
    errorCode:ErrorCodes
    error:any
    constructor(message:string,statusCode:number,errorCode:ErrorCodes,error:any){
        super(message)
        this.message=message
        this.statusCode=statusCode
        this.errorCode=errorCode
        this.error=error
    }
}


export enum ErrorCodes{
    USER_NOT_FOUND=1001,
    USER_ALREADY_EXISTS=1002,
    INVALID_CREDENTIALS=1003,
    UNAUTHORIZED=1004,
    FORBIDDEN=1005,
    BAD_REQUEST=1006,
    INTERNAL_SERVER_ERROR=1007,
    VALIDATION_ERROR=1008
}
export enum StatusCodes{
    OK=200,
    CREATED=201,
    BAD_REQUEST=400,
    UNAUTHORIZED=401,
    FORBIDDEN=403,
    NOT_FOUND=404,
    INTERNAL_SERVER_ERROR=500
}