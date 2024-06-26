import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CommonListFilterDto } from './common.list.filter.dto';

export class UserNotificationListFilterDto extends CommonListFilterDto {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    product_id: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    is_archived?: false;

    @Expose()
    @IsOptional()
    @IsBoolean()
    is_acknowledged?: false;
}