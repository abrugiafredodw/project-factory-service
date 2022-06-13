import { Client } from '../../clients/entities/client.entity';
import { Talent } from '../../talents/entities/talent.entity';
import { State } from '../enum/state.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({
    name: 'name',
    description: 'Nombre del projecto',
    required: true,
    example: 'Prestamo de dinero',
  })
  @IsNotEmpty({ message: 'Ingrese un nombre del project' })
  name: string;
  @ApiProperty({
    name: 'duration',
    type: 'number',
    description: 'Duracion del projecto',
    required: true,
    example: 15,
  })
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Ingrese la duracion del projecto' },
  )
  duration: number;
  @ApiProperty({
    name: 'client',
    type: Client,
    description: 'Cliente asociado al projecto',
    required: false,
    example: { _id: 'sa123dasd1231asda' },
  })
  client: Client;
  @ApiProperty({
    name: 'talents',
    type: Talent,
    isArray: true,
    description: 'Talentos asociados al projecto',
    required: true,
    example: [{ _id: 'sa123dasd1231asda' }],
  })
  @IsDefined({ message: 'Los Talentos son obligatorios' })
  @IsArray({ message: 'Los Talentos son obligatorios' })
  talents: Talent[];

  state?: State;
}
