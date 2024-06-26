import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import 'reflect-metadata';
import { DateRangeFilterDto } from './date.range.filter.dto';

export class DateFilterDto {
    @IsOptional()
    @ValidateNested()
    @Type(() => DateRangeFilterDto)
    @Expose()
    range?: DateRangeFilterDto;

    @IsOptional()
    @IsBoolean()
    @Expose()
    today?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    yesterday?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    week?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    last_week?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    month?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    last_month?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    current_quarter?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    previous_quarter?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    year?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    current_fy?: boolean;

    @IsOptional()
    @IsBoolean()
    @Expose()
    previous_fy?: boolean;

    @IsOptional()
    @Expose()
    fixed_month?: string;

    @IsOptional()
    @Expose()
    @IsNumber()
    nth_previous_month?: number

    @IsOptional()
    @Expose()
    @IsNumber()
    nth_previous_month_till_now?: number
}
