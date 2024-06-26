import { Expose } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';
import { CommonListFilterDto } from './common.list.filter.dto';
export class CommonIntegrationListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    integration_id?: number;
}
