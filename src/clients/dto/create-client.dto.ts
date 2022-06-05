import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    name: 'name',
    description: 'Nombre del cliente',
    required: true,
  })
  name: string;
  @ApiProperty({
    name: 'mail',
    description: 'Mail del cliente',
    required: true,
  })
  mail: string;
  @ApiProperty({
    name: 'avail',
    description: 'Cliente habilitado',
    required: false,
    readOnly: true,
  })
  avail?: boolean;
}
