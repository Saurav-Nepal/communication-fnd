import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class RecurringDocumentListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @IsBoolean()
    active?: boolean;

    @IsOptional()
    @Expose()
    source?: string;
}
