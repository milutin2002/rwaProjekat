import { FileTypeValidator, FileTypeValidatorOptions, FileValidator } from '@nestjs/common';
import { ValidationOptions } from 'sequelize/types/instance-validator';

export class MultiFileTypeValidator extends FileTypeValidator{
  constructor(private allowedTypes: string[],validationOptions: FileTypeValidatorOptions) {
    super(validationOptions);
  }

  isValid(file: Express.Multer.File): boolean {
    const mimeType = file.mimetype;
    return this.allowedTypes.some((type) => mimeType.includes(type));
  }
}