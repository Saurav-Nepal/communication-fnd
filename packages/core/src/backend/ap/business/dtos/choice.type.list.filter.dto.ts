import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

export class ChoiceTypeListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @IsBoolean()
    active: boolean;
}
