import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { Rol } from '../enum/rol.enum';

export class UpdateTalentDto {
  @ApiProperty({
    name: '_id',
    description: 'Indentificador del talento registrado',
    required: true,
    example: 'asdasd1231231qwdaqwe',
  })
  @IsNotEmpty({ message: 'El campo no puede venir vacio' })
  _id: string;
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
    name: 'rol',
    description: 'Rol del talento',
    required: true,
    enum: Rol,
    example: 'DEVELOPER',
  })
  @IsEnum(Rol, { message: 'Valor no permitido en el campo' })
  rol: Rol;

  mail?: string;
  photo?: string;
  avail?: boolean;
}
