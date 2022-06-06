import {InternalServerErrorException} from "@nestjs/common";

export class ApiExceptions extends InternalServerErrorException{

    apiMessage:string;
    constructor(objectOrError: any, description: string) {
        super(objectOrError, description);
        this.apiMessage=description;
    }
}