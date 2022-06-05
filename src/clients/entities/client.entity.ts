import { ApiProperty } from '@nestjs/swagger';

export class Client {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  mail: string;
  @ApiProperty()
  avail: boolean;
}
