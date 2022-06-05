import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from '@nestjs/terminus/dist/health-indicator/http/axios.interfaces';
import { AxiosRequestHeaders } from 'axios';

@Injectable()
export class ClientsService {
  private readonly urlClient: string = '';
  private header: AxiosRequestHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(
    private readonly httpService: HttpService,
    private readonly config: ConfigService,
  ) {
    this.urlClient = this.config.get('URL_CLIENTS');
  }

  create(createClientDto: CreateClientDto): Observable<Client> {
    return this.httpService
      .post(`${this.urlClient}`, createClientDto, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client),
      );
  }

  findAll(): Observable<Client[]> {
    return this.httpService
      .get(`${this.urlClient}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client[]),
      );
  }

  findAllAvail(): Observable<Client[]> {
    return this.httpService
      .get(`${this.urlClient}/avail`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client[]),
      );
  }

  findOne(mail: string): Observable<Client> {
    return this.httpService
      .get(`${this.urlClient}/${mail}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client),
      );
  }

  update(updateClientDto: UpdateClientDto) {
    return this.httpService
      .patch(`${this.urlClient}`, updateClientDto, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client),
      );
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
