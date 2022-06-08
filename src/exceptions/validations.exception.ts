import {BadRequestException} from "@nestjs/common";

export class ValidationsException extends BadRequestException{
    apiMessage:string
    constructor(public errores: string[]) {
        super();
        this.apiMessage="Error en la validaciones";
    }
}