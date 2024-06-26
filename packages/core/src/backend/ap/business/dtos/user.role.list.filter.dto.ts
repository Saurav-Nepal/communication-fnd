import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserRoleListFilterDto extends CommonListFilterDto {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    role_group_id: number;
}
