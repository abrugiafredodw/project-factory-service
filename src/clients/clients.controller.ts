import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import {ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiResponse, ApiTags} from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { Observable } from 'rxjs';
import {ErrorApi} from "../model/error.api";
import {ResponseApi} from "../model/response-api";

@Controller({ path: 'clients', version: ['1'] })
@ApiTags('Clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Se guarda el cliente con exito.',
    type: Client,
  })
  @ApiBadRequestResponse({
    status:400,
    description: "Error al crear al cliente",
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse(
      {
        status:500,
        description: "Error en el servicio",
        type: ErrorApi,
      }
  )
  create(@Body() createClientDto: CreateClientDto): Observable<Client> {
    createClientDto.avail = true;
    return this.clientsService.create(createClientDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Se devuelve la lista de clientes registrados.',
    type: Client,
    isArray: true,
  })
  @ApiInternalServerErrorResponse(
      {
        status:500,
        description: "Error en el servicio",
        type: ErrorApi,
      }
  )
  @ApiBadRequestResponse({
    status:400,
    description: "Error al listar los clientes",
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse(
      {
        status:500,
        description: "Error en el servicio",
        type: ErrorApi,
      }
  )
  findAll(): Observable<Client[]> {
    return this.clientsService.findAll();
  }

  @Get('/avail')
  @ApiResponse({
    status: 200,
    description: 'Se devuelve la lista de clientes registrados disponibles.',
    type: Client,
    isArray: true,
  })
  @ApiBadRequestResponse({
    status:400,
    description: "Error al listar los clientes",
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse(
      {
        status:500,
        description: "Error en el servicio",
        type: ErrorApi,
      }
  )
  findAllAvail(): Observable<Client[]> {
    return this.clientsService.findAllAvail();
  }

  @Get(':mail')
  @ApiResponse({
    status: 200,
    description: 'Se devuelve el clientes buscado por mail.',
    type: Client,
  })
  @ApiBadRequestResponse({
    status:400,
    description: "Error al traer al cliente",
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse(
      {
        status:500,
        description: "Error en el servicio",
        type: ErrorApi,
      }
  )
  findOne(@Param('mail') mail: string): Observable<Client> {
    return this.clientsService.findOne(mail);
  }

  @Get(':mail/avail')
  @ApiResponse({
    status: 200,
    description: 'Se devuelve el clientes buscado por mail habilitado.',
    type: Client,
  })
  @ApiBadRequestResponse({
    status:400,
    description: "Error al traer al cliente",
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse(
      {
        status:500,
        description: "Error en el servicio",
        type: ErrorApi,
      }
  )
  findOneAvail(@Param('mail') mail: string): Observable<Client> {
    return this.clientsService.findOneAvail(mail);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Permite modificar los datos de los clientes.',
    type: Client,
  })
  @ApiBadRequestResponse({
    status:400,
    description: "Error al modificar al cliente",
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse(
      {
        status:500,
        description: "Error en el servicio",
        type: ErrorApi,
      }
  )
  update(@Body() updateClientDto: UpdateClientDto): Observable<Client> {
    return this.clientsService.update(updateClientDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Permite modificar los datos de los clientes.',
    type: ResponseApi,
  })
  @ApiBadRequestResponse({
    status:400,
    description: "Error al modificar al cliente",
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse(
      {
        status:500,
        description: "Error en el servicio",
        type: ErrorApi,
      }
  )
  remove(@Param('id') id: string):Observable<ResponseApi> {
    return this.clientsService.remove(id);
  }
}
