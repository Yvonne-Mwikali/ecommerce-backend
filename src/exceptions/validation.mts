import { ErrorCodes, HttpException, StatusCodes } from "./root.mjs"

export class UnprocessableEntity extends HttpException {
    constructor(message: string, error: any, errorCode: number) {
        super(message,  StatusCodes.UNPROCESSABLE_ENTITY,errorCode, error)
        this.name = "UnprocessableEntity"
        Object.setPrototypeOf(this, UnprocessableEntity.prototype)
    }}