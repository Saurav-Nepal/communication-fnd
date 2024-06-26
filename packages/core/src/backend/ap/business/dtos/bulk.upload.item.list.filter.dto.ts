import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class BulkUploadItemListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    sheet?: string;

    @IsOptional()
    @Expose()
    @IsBoolean()
    errors?: boolean;
}
