import { Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';

@Injectable()
export class TalentsService {
  create(createTalentDto: CreateTalentDto) {
    return 'This action adds a new talent';
  }

  findAll() {
    return `This action returns all talents`;
  }

  findOne(mail: string) {
    return `This action returns a #${mail} talent`;
  }

  update(updateTalentDto: UpdateTalentDto) {
    return `This action updates a # talent`;
  }

  remove(id: number) {
    return `This action removes a #${id} talent`;
  }
}
