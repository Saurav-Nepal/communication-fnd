import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';

export class LocationListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    active?: boolean;
}
