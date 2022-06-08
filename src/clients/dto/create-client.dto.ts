import { ApiProperty } from '@nestjs/swagger';
import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateClientDto {
  @ApiProperty({
    name: 'name',
    description: 'Nombre del cliente',
    required: true,
  })
  @IsNotEmpty({message: "Ingrese un nombre"})
  name: string;
  @ApiProperty({
    name: 'mail',
    description: 'Mail del cliente',
    required: true,
  })
  @IsEmail({},{message: "Formato de mail no valido"})
  mail: string;
  @ApiProperty({
    name: 'avail',
    description: 'Cliente habilitado',
    required: false,
    readOnly: true,
  })
  avail?: boolean;
}
