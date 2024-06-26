import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class BulkUploadItemListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @IsNumber()
    type_id?: number;
}
