import {ApiProperty} from "@nestjs/swagger";

export class ResponseApi{

    @ApiProperty({
        name:'message',
        description: 'Mensaje de respuesta'
    })
    message:string;
}