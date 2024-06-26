import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';

export class DocumentRemoveDto {
    @Expose()
    @IsArray()
    ids: number[];
}
