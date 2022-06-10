import { Injectable } from '@nestjs/common';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';
import { Talent } from './entities/talent.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '../app.module';
import { ENVIROMENT } from '../utils/utils';
import { ApiExceptions } from '../exceptions/api.exceptions';
import { TalentsException } from './exception/talents.exception';
import { ResponseApi } from '../model/response-api';

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
    createTalentDto.image = null;
    if (AppModule.ENV == ENVIROMENT.DEV) {
      createTalentDto.photo = `${this.urlImagen}/${image.filename}`;
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

  findAll(): Observable<Talent[]> {
    return this.httpService
      .get(`${this.urlTalent}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Talent[]),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al listar los talentos';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new TalentsException(err, error, 20000);
          }
        }),
      );
  }

  findAllAvail(): Observable<Talent[]> {
    return this.httpService
      .get(`${this.urlTalent}/avail`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Talent[]),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al listar los talentos habilitados';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new TalentsException(err, error, 20000);
          }
        }),
      );
  }

  findOne(mail: string): Observable<Talent> {
    return this.httpService
      .get(`${this.urlTalent}/${mail}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Talent),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al listar los talentos habilitados';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new TalentsException(err, error, 20000);
          }
        }),
      );
  }

  findOneId(id: string): Observable<Talent> {
    return this.httpService
      .get(`${this.urlTalent}/id/${id}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Talent),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al listar los talentos habilitados';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new TalentsException(err, error, 20000);
          }
        }),
      );
  }

  findOneAvail(mail: string): Observable<Talent> {
    return this.httpService
      .get(`${this.urlTalent}/${mail}/avail`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Talent),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al traer el talento';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new TalentsException(err, error, 20000);
          }
        }),
      );
  }

  async update(updateTalentDto: UpdateTalentDto): Promise<Talent> {
    const talent = await lastValueFrom(this.findOneId(updateTalentDto._id));
    const updateTalentDto2: UpdateTalentDto = {
      _id: talent._id,
      name: updateTalentDto.name,
      surname: updateTalentDto.surname,
      mail: talent.mail,
      photo: talent.photo,
      avail: talent.avail,
      rol: updateTalentDto.rol,
    };

    return await lastValueFrom(
      this.httpService
        .patch(`${this.urlTalent}`, updateTalentDto2, {
          headers: this.header,
        })
        .pipe(
          map((axiosResponse: AxiosResponse) => axiosResponse.data as Talent),
          catchError((err) => {
            const error = err.response
              ? err.response.data.error
              : 'Error al modificar el talento';
            if (err.code == 'ECONNABORTED') {
              throw new ApiExceptions(err, 'Error en el servicio');
            } else {
              throw new TalentsException(err, error, 20000);
            }
          }),
        ),
    );
  }

  remove(id: string): Observable<ResponseApi> {
    const responseApi: ResponseApi = new ResponseApi();
    responseApi.message = 'Se elimino correctamente el talento';
    return this.httpService
      .delete(`${this.urlTalent}/${id}`, {
        headers: this.header,
      })
      .pipe(
        map(() => responseApi),
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

  async updatePhoto(image: Express.Multer.File, id: string): Promise<Talent> {
    const talent = await lastValueFrom(this.findOneId(id));
    const updateTalentDto: UpdateTalentDto = {
      _id: talent._id,
      name: talent.name,
      surname: talent.surname,
      mail: talent.mail,
      photo: talent.photo,
      avail: talent.avail,
      rol: talent.rol,
    };
    if (AppModule.ENV == ENVIROMENT.DEV) {
      updateTalentDto.photo = `${this.urlImagen}/${image.filename}`;
    } else {
      // Aca subir a S3 amazon
    }

    return await lastValueFrom(
      this.httpService
        .patch(`${this.urlTalent}`, updateTalentDto, {
          headers: this.header,
        })
        .pipe(
          map((axiosResponse: AxiosResponse) => axiosResponse.data as Talent),
          catchError((err) => {
            const error = err.response
              ? err.response.data.error
              : 'Error al modificar el talento';
            if (err.code == 'ECONNABORTED') {
              throw new ApiExceptions(err, 'Error en el servicio');
            } else {
              throw new TalentsException(err, error, 20000);
            }
          }),
        ),
    );
  }
}
