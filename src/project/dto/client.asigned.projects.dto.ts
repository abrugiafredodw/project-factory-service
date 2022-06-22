import { IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClientAsignedProjectsDto {
  @ApiProperty({
    name: 'projects',
    type: 'string',
    isArray: true,
    description: 'Id de projectos',
    required: true,
    example: ['sa123dasd1231asda', 'asda213123sasd123d'],
  })
  @IsArray({ message: 'Enviar ids de projectos' })
  projects: string[];
}
