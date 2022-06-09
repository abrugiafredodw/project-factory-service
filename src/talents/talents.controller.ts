import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TalentsService } from './talents.service';
import { CreateTalentDto } from './dto/create-talent.dto';
import { UpdateTalentDto } from './dto/update-talent.dto';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorApi } from '../model/error.api';
import { Talent } from './entities/talent.entity';
import { ResponseApi } from '../model/response-api';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { fileName, imageFileFilter } from './utils/file.utils';
import { Observable } from 'rxjs';

@Controller({ path: 'talents', version: ['1'] })
@ApiTags('Talents')
export class TalentsController {
  constructor(private readonly talentsService: TalentsService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({
    name: 'file',
    required: true,
    description: 'Foto del talento, Formatos: [jpg, jpeg, png] ',
  })
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
