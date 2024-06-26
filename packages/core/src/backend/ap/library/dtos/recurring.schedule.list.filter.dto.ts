import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class RecurringScheduleListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @IsBoolean()
    active?: boolean;

    @Expose()
    @IsOptional()
    @IsNumber()
    recurring_id: number;
}
