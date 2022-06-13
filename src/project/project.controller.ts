import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, Put,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorApi } from '../model/error.api';
import { Project } from './entities/project.entity';
import {State} from "./enum/state.enum";

@Controller({ path: 'project', version: ['1'] })
@ApiTags('Project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Se guarda el projecto con exito.',
    type: Project,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al crear el projecto',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Se lista el projecto.',
    type: Project,
    isArray: true,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al listar el projecto',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Se trae el projecto.',
    type: Project,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al traer el projecto',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id del projecto',
    example: 'asd123asdas313',
  })
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch()
  @ApiResponse({
    status: 200,
    description: 'Se modifica el projecto.',
    type: Project,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al modificar el projecto',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  update(@Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(updateProjectDto);
  }
  @Patch(':id/state/:state')
  @ApiResponse({
    status: 200,
    description: 'Se modifica el estado projecto.',
    type: Project,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al modificar el estado projecto',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id del projecto',
    example: 'asd123asdas313',
  })
  @ApiParam({
    name: 'state',
    type: 'string',
    enum: State,
    required: true,
    description: 'Estado del projecto',
    example: State.PENDING,
  })
  updateState(@Param('id') id: string, @Param('state') state: State) {
    return this.projectService.updateState(id, state);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Se elimina el projecto.',
    type: Project,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al eliminar el projecto',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id del projecto',
    example: 'asd123asdas313',
  })
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id);
  }
}
