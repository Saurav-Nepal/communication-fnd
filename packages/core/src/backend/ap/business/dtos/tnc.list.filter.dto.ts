import { IsNumber, IsOptional } from 'class-validator';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';

export class TncListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    vendor_type_id?: number;
}
