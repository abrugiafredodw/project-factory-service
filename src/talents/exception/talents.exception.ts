import { BadRequestException } from '@nestjs/common';

export class TalentsException extends BadRequestException {
  apiErrorCode: number;
  apiMessage: string;
  constructor(objectOrError: any, description: string, apiErrorCode: number) {
    super(objectOrError, description);
    this.apiErrorCode = apiErrorCode;
    this.apiMessage = description;
  }
}
