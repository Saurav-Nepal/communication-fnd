import { Expose, Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { AddDashboardComponentDto } from './add.dashboard.component.dto';
import 'reflect-metadata';

export class AddDashboardDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    id?: number;

    @Expose()
    @IsOptional()
    name?: string;

    @Expose()
    @IsOptional()
    identifier?: string;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => AddDashboardComponentDto)
    @IsArray()
    components: AddDashboardComponentDto[];
}
