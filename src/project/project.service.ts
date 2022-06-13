import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { State as Statee } from './enum/state.enum';
import { catchError, lastValueFrom, map, Observable } from 'rxjs';
import { Project } from './entities/project.entity';
import { ApiExceptions } from '../exceptions/api.exceptions';
import { ProjectException } from './exception/project.exception';
import { State } from './entities/state/state';
import { StateFactory } from './entities/state/state.factory';

@Injectable()
export class ProjectService {
  private urlProject = '';
  private header: AxiosRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.urlProject = `${this.config.get('URL_PROJECT')}project`;
  }

  create(createProjectDto: CreateProjectDto): Observable<Project> {
    createProjectDto.state = Statee.PENDING;

    return this.httpService
      .post(`${this.urlProject}`, createProjectDto, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Project),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al crear el projecto';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new ProjectException(err, error, 30000);
          }
        }),
      );
  }

  findAll(): Observable<Project[]> {
    return this.httpService
      .get(`${this.urlProject}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Project[]),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al listar los projectos';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new ProjectException(err, error, 30001);
          }
        }),
      );
  }

  findOne(id: string): Observable<Project> {
    return this.httpService
      .get(`${this.urlProject}/${id}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Project),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al traer el projectos';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new ProjectException(err, error, 30002);
          }
        }),
      );
  }

  update(updateProjectDto: UpdateProjectDto): Observable<Project> {
    return this.httpService
      .patch(`${this.urlProject}`, updateProjectDto, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Project),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al modificar el projectos';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new ProjectException(err, error, 30003);
          }
        }),
      );
  }

  remove(id: number): Observable<Project> {
    return this.httpService
      .delete(`${this.urlProject}/${id}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Project),
        catchError((err) => {
          const error = err.response
            ? err.response.data.error
            : 'Error al eliminar el projectos';
          if (err.code == 'ECONNABORTED') {
            throw new ApiExceptions(err, 'Error en el servicio');
          } else {
            throw new ProjectException(err, error, 30004);
          }
        }),
      );
  }

  async updateState(id: string, stateNext: Statee): Promise<Project> {
    const project = await lastValueFrom(this.findOne(id));
    const stateProject: State = StateFactory.getState(project.state);
    const stateNextProject = stateProject.next(stateNext);
    const projectUpdate: UpdateProjectDto = {
      _id: project._id,
      name: project.name,
      client: project.client,
      talents: project.talents,
      duration: project.duration,
      state: Statee[stateNextProject.toString()],
    };
    return lastValueFrom(this.update(projectUpdate));
  }
}
