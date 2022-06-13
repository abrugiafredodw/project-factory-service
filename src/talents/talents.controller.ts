import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TalentsService } from './talents.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorApi } from '../model/error.api';
import { Talent } from './entities/talent.entity';
import { ResponseApi } from '../model/response-api';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileName, imageFileFilter } from './utils/file.utils';
import { Observable } from 'rxjs';
import { ValidationsException } from '../exceptions/validations.exception';

@Controller({ path: 'talents', version: ['1'] })
@ApiTags('Talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
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
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './image',
        filename: fileName,
      }),
    }),
  )
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createTalentDto: CreateTalentDto,
  ): Observable<Talent> {
    return this.talentsService.create(image, createTalentDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Se lista los talentos.',
    type: Talent,
    isArray: true,
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
  findAll(): Observable<Talent[]> {
    return this.talentsService.findAll();
  }

  @Get('avail')
  @ApiResponse({
    status: 200,
    description: 'Se lista los talentos habilitado.',
    type: Talent,
    isArray: true,
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
  findAllAvail(): Observable<Talent[]> {
    return this.talentsService.findAllAvail();
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
  @ApiParam({
    name: 'mail',
    type: 'string',
    required: true,
    description: 'Mail del talento',
    example: 'persona@correo.com',
  })
  findOne(@Param('mail') mail: string): Observable<Talent> {
    return this.talentsService.findOne(mail);
  }

  @Get(':mail/avail')
  @ApiResponse({
    status: 200,
    description: 'Se obtiene el talento habilitado.',
    type: Talent,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Mensaje de error al obtener el talento habilitado.',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  @ApiParam({
    name: 'mail',
    type: 'string',
    required: true,
    description: 'Mail del talento',
    example: 'persona@correo.com',
  })
  findOneAvail(@Param('mail') mail: string): Observable<Talent> {
    return this.talentsService.findOneAvail(mail);
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
  update(@Body() updateTalentDto: UpdateTalentDto): Promise<Talent> {
    return this.talentsService.update(updateTalentDto);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    description: 'Se modifica la foto del talento.',
    type: Talent,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Error al modificar la foto del talento.',
    type: ErrorApi,
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Error en el servicio',
    type: ErrorApi,
  })
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
      storage: diskStorage({
        destination: './image',
        filename: fileName,
      }),
    }),
  )
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      properties: {
        image: {
          description: 'Foto del talento, Formatos: [jpg, jpeg, png]',
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id del talento',
    example: 'asdasd1q23213asda',
  })
  updatePhoto(
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<Talent> {
    if (!image) {
      throw new ValidationsException(['La imagen es requerida']);
    }
    return this.talentsService.updatePhoto(image, id);
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
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Id del talento',
    example: 'asdasd1q23213asda',
  })
  remove(@Param('id') id: string): Observable<ResponseApi> {
    return this.talentsService.remove(id);
  }
}
