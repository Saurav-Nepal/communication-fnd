import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class SourceFilterDto {
    @IsNotEmpty()
    @Expose()
    source_type: string;

    @IsNotEmpty()
    @Expose()
    @IsNumber()
    source_id: number;
}
