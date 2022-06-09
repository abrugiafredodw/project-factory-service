import e from 'express';
import { ValidationsException } from '../../exceptions/validations.exception';
import { v4 as uuid } from 'uuid';

export const imageFileFilter = (
  req: e.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(JPG|jpg|jpeg|png)$/)) {
    return callback(
      new ValidationsException([
        'Formato de la imagen incorrecto, formatos aceptados [jpg, jpeg, png]',
      ]),
      false,
    );
  }
  callback(null, true);
};

export const fileName = (
  req: e.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, filename: string) => void,
) => {
  const ext = file.originalname.split('.').at(-1);
  const filename = `${uuid()}.${ext}`;
  callback(null, filename);
};
