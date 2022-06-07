import {Injectable, InternalServerErrorException} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { HttpService } from '@nestjs/axios';
import {catchError, map, mapTo, Observable} from 'rxjs';
import { ConfigService } from '@nestjs/config';
import {AxiosRequestHeaders, AxiosResponse} from 'axios';
import {ClientsException} from "./exception/clients.exception";
import {ApiExceptions} from "../exceptions/api.exceptions";
import {ResponseApi} from "../model/response-api";

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
    this.urlClient = this.config.get('URL_CLIENTS')+'client';
  }

  create(createClientDto: CreateClientDto): Observable<Client> {
    return this.httpService
      .post(`${this.urlClient}`, createClientDto, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse:AxiosResponse) => axiosResponse.data as Client),
          catchError(err => {
              const error=err.response?err.response.data.error:"Error al crear el cliente";
              if(err.code=='ECONNABORTED'){
                  throw new ApiExceptions(err,"Error en el servicio");
              }else {
                  throw new ClientsException(err, error, 10000);
              }
          })
      );
  }

  findAll(): Observable<Client[]> {
    return this.httpService
      .get(`${this.urlClient}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client[]),
          catchError(err => {
              const error=err.response?err.response.data.error:"Error al listar los clientes";
              if(err.code=='ECONNABORTED'){
                  throw new ApiExceptions(err,"Error en el servicio");
              }else {
                  throw new ClientsException(err, error, 10000);
              }
          })
      );
  }

  findAllAvail(): Observable<Client[]> {
    return this.httpService
      .get(`${this.urlClient}/avail`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client[]),
          catchError(err => {
              const error=err.response?err.response.data.error:"Error al listar los clientes";
              if(err.code=='ECONNABORTED'){
                  throw new ApiExceptions(err,"Error en el servicio");
              }else {
                  throw new ClientsException(err, error, 10000);
              }
          })
      );
  }

  findOne(mail: string): Observable<Client> {
    return this.httpService
      .get(`${this.urlClient}/${mail}`, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client),
          catchError(err => {
              const error=err.response?err.response.data.error:"Error al traer al cliente";
              if(err.code=='ECONNABORTED'){
                  throw new ApiExceptions(err,"Error en el servicio");
              }else {
                  throw new ClientsException(err, error, 10000);
              }
          })
      );
  }

    findOneAvail(mail: string): Observable<Client> {
        return this.httpService
            .get(`${this.urlClient}/${mail}/avail`, {
                headers: this.header,
            })
            .pipe(
                map((axiosResponse: AxiosResponse) => axiosResponse.data as Client),
                catchError(err => {
                    const error=err.response?err.response.data.error:"Error al traer al cliente";
                    if(err.code=='ECONNABORTED'){
                        throw new ApiExceptions(err,"Error en el servicio");
                    }else {
                        throw new ClientsException(err, error, 10000);
                    }
                })
            );
    }

  update(updateClientDto: UpdateClientDto): Observable<Client> {
    return this.httpService
      .patch(`${this.urlClient}`, updateClientDto, {
        headers: this.header,
      })
      .pipe(
        map((axiosResponse: AxiosResponse) => axiosResponse.data as Client),
          catchError(err => {
              const error=err.response?err.response.data.error:"Error al modificar el cliente";
              if(err.code=='ECONNABORTED'){
                  throw new ApiExceptions(err,"Error en el servicio");
              }else {
                  throw new ClientsException(err, error, 10000);
              }
          })
      );
  }

  remove(id: string):Observable<ResponseApi> {
      const responseApi:ResponseApi=new ResponseApi();
      responseApi.message="Se elimino correctamente el cliente";
      return this.httpService
          .delete(`${this.urlClient}/${id}`, {
              headers: this.header,
          })
          .pipe(
              map(()=>responseApi),
              catchError(err => {
                  const error=err.response?err.response.data.error:"Error al modificar el cliente";
                  if(err.code=='ECONNABORTED'){
                      throw new ApiExceptions(err,"Error en el servicio");
                  }else {
                      throw new ClientsException(err, error, 10000);
                  }
              })
          );
  }
}
