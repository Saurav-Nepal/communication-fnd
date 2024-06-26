import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';


export class BusinessUserListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    product_id?: number;
}
