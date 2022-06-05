import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({
    name: '_id',
    description: 'Indentificador del cliente registrado',
    required: true,
  })
  _id: string;
}
