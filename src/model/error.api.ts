import {ApiProperty} from "@nestjs/swagger";

export class ErrorApi{
    @ApiProperty({
        name:'code',
        description: 'Codigo de error de la api'
    })
    code:number;
    @ApiProperty({
        name:'message',
        description: 'Mensaje de error de la api'
    })
    message: string;


    trace?:any;
}