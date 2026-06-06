import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { isUUID } from 'class-validator';

@Injectable()
export class ParseUUIDPipe implements PipeTransform<string, string> {
    transform(value: string): string {
        if (!isUUID(value, 4)) {
            throw new BadRequestException(`Validation failed. "${value}" is not a valid v4 UUID.`);
        }
        return value.toLowerCase(); // Transforming data safely
    }
}