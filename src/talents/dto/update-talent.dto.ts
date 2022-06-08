import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateTalentDto } from './create-talent.dto';
import {IsNotEmpty} from "class-validator";

export class UpdateTalentDto extends PartialType(CreateTalentDto) {
    @ApiProperty({
        name: '_id',
        description: 'Indentificador del talento registrado',
        required: true,
        example: "asdasd1231231qwdaqwe"
    })
    @IsNotEmpty({message: "El campo no puede venir vacio"})
    _id:string;
}
