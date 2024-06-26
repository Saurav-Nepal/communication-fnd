import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, } from 'class-validator';

export class CustomFieldListFilterDto extends CommonListFilterDto {
    @IsNumber()
    @Expose()
    @IsNotEmpty()
    type_id?: number;

   @Expose()
   @IsBoolean()
   @IsOptional()
   active?: boolean;
}
