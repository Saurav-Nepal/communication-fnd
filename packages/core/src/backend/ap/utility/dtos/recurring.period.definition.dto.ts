import { Expose } from 'class-transformer';
import { IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class RecurringPeriodDefinitionDto {
    @IsISO8601()
    @Expose()
    @IsOptional()
    start_time?: Date;

    @IsISO8601()
    @Expose()
    @IsOptional()
    end_time?: Date;

    @IsNumber()
    @Expose()
    @IsOptional()
    times?: number;
}
