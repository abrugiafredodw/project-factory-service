import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @ApiProperty({
    name: '_id',
    description: 'ID del projecto',
    required: true,
    example: 'as123das123as12asd3dasd',
  })
  @IsNotEmpty({ message: 'Ingrese un id del project' })
  _id: string;
}
