import { Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { catchError, map, Observable } from 'rxjs';
import { Talent } from './entities/talent.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../app.module';
import { ENVIROMENT } from '../utils/utils';
import { join } from 'path';
import { ApiExceptions } from '../exceptions/api.exceptions';
import {TalentsException} from "./exception/talents.exception";

@Injectable()
export class TalentsService {
  private readonly urlTalent: string = '';
  private readonly urlImagen: string = '';
  private header: AxiosRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.urlTalent = `${this.config.get('URL_TALENTS')}talent`;
    this.urlImagen =
      AppModule.ENV == 'dev'
        ? this.config.get('PATH_FILE')
        : this.config.get('AWS_IMAGE_TALENTS');
  }

  create(
    image: Express.Multer.File,
    createTalentDto: CreateTalentDto,
  ): Observable<Talent> {
    createTalentDto.avail = true;
    if (AppModule.ENV == ENVIROMENT.DEV) {
      createTalentDto.photo = join(this.urlImagen, image.filename);
    } else {
      // Aca subir a S3 amazon
    }
    return this.httpService
      .post(`${this.urlTalent}`, createTalentDto, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Talent),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al crear el talento';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new TalentsException(err, error, 20000);
          }
        }),
      );
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
