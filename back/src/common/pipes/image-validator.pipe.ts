import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ImageValidatorPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      return file;
    }

    // Validar el tamaño de la imagen (no mayor a 200kb)
    if (file.size > 200 * 1024) {
      throw new BadRequestException('File size exceeds the limit of 200kb');
    }

    // Validar los tipos de imagen permitidos
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    return file;
  }
}
