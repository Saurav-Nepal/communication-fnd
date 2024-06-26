import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class NumberRangeFilterDto {
    @IsOptional()
    @IsNumber()
    @Expose()
    min: number;

    @IsOptional()
    @IsNumber()
    @Expose()
    max: number;

    @IsOptional()
    @Expose()
    positive: boolean;

    @IsOptional()
    @Expose()
    negative: boolean;

    @IsOptional()
    @Expose()
    zero: boolean;
}
