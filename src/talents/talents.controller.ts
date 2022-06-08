import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TalentsService } from './talents.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import {ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ErrorApi} from "../model/error.api";
import {Talent} from "./entities/talent.entity";
import {ResponseApi} from "../model/response-api";

@Controller('talents')
@ApiTags('Talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Se guarda el talento con exito.',
    type: Talent,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al crear al talento',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  create(@Body() createTalentDto: CreateTalentDto) {
    return this.talentsService.create(createTalentDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Se lista los talentos.',
    type: Talent,
    isArray:true,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al listar los talentos.',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  findAll() {
    return this.talentsService.findAll();
  }

  @Get(':mail')
  @ApiResponse({
    status: 200,
    description: 'Se obtiene el talento.',
    type: Talent,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al obtener el talento.',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  findOne(@Param('mail') mail: string) {
    return this.talentsService.findOne(mail);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Se modifica el talento.',
    type: Talent,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al modificar el talento.',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  update(@Body() updateTalentDto: UpdateTalentDto) {
    return this.talentsService.update(updateTalentDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Se elimina el talento.',
    type: ResponseApi,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al eliminar el talento.',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  remove(@Param('id') id: string) {
    return this.talentsService.remove(+id);
  }
}
