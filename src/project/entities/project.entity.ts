import { Client } from '../../clients/entities/client.entity';
import { Talent } from '../../talents/entities/talent.entity';
import { State } from '../enum/state.enum';
import { ApiProperty } from '@nestjs/swagger';

export class Project {
  @ApiProperty({
    name: '_id',
    description: 'ID del projecto',
    required: true,
    example: 'as123das123as12asd3dasd',
  })
  _id: string;
  @ApiProperty({
    name: 'name',
    description: 'Nombre del projecto',
    required: true,
    example: 'Prestamo de dinero',
  })
  name: string;
  @ApiProperty({
    name: 'duration',
    type: 'number',
    description: 'Duracion del projecto',
    required: true,
    example: 15,
  })
  duration: number;
  @ApiProperty({
    name: 'client',
    type: Client,
    description: 'Cliente asociado al projecto',
    required: true,
  })
  client: Client;
  @ApiProperty({
    name: 'talents',
    type: Talent,
    isArray: true,
    description: 'Talentos asociados al projecto',
    required: true,
  })
  talents: Talent[];
  @ApiProperty({
    name: 'state',
    type: 'string',
    isArray: true,
    description: 'Estado del projecto',
    required: true,
    enum: State,
    example: State.DONE,
    examples: Object.values(State),
  })
  state: State;
}
