import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common/interfaces/features/pipe-transform.interface';
import { logger } from 'nx/src/utils/logger';

@Injectable()
export class MinValuePipe implements PipeTransform {
  constructor(private readonly min: number) {}

  transform(value: number, metadata: ArgumentMetadata): number {
    if (value < this.min) {
      throw new BadRequestException(
        `${metadata.data} must be at least ${this.min}`
      );
    }
    return value;
  }
}
