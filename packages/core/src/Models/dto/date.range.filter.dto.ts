import { Expose } from 'class-transformer';
import { IsNotEmpty, IsISO8601 } from 'class-validator';

export class DateRangeFilterDto {
    @IsNotEmpty()
    @IsISO8601()
    @Expose()
    min: string;

    @IsNotEmpty()
    @IsISO8601()
    @Expose()
    max: string;
}
