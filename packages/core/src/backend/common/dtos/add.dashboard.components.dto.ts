import { Expose, Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import 'reflect-metadata';
import { AddDashboardComponentDto } from './add.dashboard.component.dto';

export class AddDashboardComponentsDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    dashboard_id: number;

    @IsNotEmpty()
    @IsArray()
    @Type(() => AddDashboardComponentDto)
    @ValidateNested()
    @Expose()
    components: AddDashboardComponentDto[];
}
