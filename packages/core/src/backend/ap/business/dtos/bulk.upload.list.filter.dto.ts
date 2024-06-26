import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { BulkUploadTypeEnum } from '../../../../Constants';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';

export class BulkUploadListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    definition_id?: BulkUploadTypeEnum;
}
