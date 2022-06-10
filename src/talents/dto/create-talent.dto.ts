import { Rol } from '../enum/rol.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreateTalentDto {
  @ApiProperty({
    name: 'name',
    description: 'Nombre del talento',
    required: true,
    example: 'Marcelo',
  })
  @IsNotEmpty({ message: 'Ingrese un nombre' })
  name: string;
  @ApiProperty({
    name: 'surname',
    description: 'Apellido del talento',
    required: true,
    example: 'Perez',
  })
  @IsNotEmpty({ message: 'Ingrese un apellido' })
  surname: string;
  @ApiProperty({
    name: 'mail',
    description: 'Mail del talento',
    required: true,
    example: 'marcelo.perez@coreo.com',
  })
  @IsEmail({}, { message: 'Formato de mail no valido' })
  mail: string;
  @ApiProperty({
    name: 'rol',
    description: 'Rol del talento',
    required: true,
    enum: Rol,
    example: 'DEVELOPER',
  })
  @IsEnum(Rol, { message: 'Valor no permitido en el campo' })
  rol: Rol;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Foto del talento, Formatos: [jpg, jpeg, png]',
    required: true,
  })
  @IsDefined({ message: 'La imagen es requerida' })
  image: Express.Multer.File;

  photo?: string;
  avail?: boolean;
}
