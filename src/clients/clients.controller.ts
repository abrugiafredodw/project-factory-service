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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Client } from './entities/client.entity';
import { Observable } from 'rxjs';

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
  findAllAvail(): Observable<Client[]> {
    return this.clientsService.findAllAvail();
  }

  @Get(':mail')
  @ApiResponse({
    status: 200,
    description: 'Se devuelve la lista de clientes registrados disponibles.',
    type: Client,
  })
  findOne(@Param('mail') mail: string): Observable<Client> {
    return this.clientsService.findOne(mail);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'permite modificar los datos de los clientes.',
    type: Client,
  })
  update(@Body() updateClientDto: UpdateClientDto): Observable<Client> {
    return this.clientsService.update(updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
