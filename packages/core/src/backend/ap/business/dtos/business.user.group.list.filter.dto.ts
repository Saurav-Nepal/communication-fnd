import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsOptional, IsBoolean } from 'class-validator';


export class BusinessUserGroupListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @IsBoolean()
    active: boolean;
}
