import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';
import {IsNotEmpty} from "class-validator";

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({
    name: '_id',
    description: 'Indentificador del cliente registrado',
    required: true,
    example: "asdasd1231231qwdaqwe"
  })
  @IsNotEmpty({message: "El campo no puede venir vacio"})
  _id: string;
}
