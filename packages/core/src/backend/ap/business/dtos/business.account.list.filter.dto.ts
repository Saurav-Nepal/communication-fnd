import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class BusinessAccountListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @IsBoolean()
    active: boolean;

    @Expose()
    @IsNumber()
    @IsOptional()
    vendor_account_id?: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    is_gst?: boolean;
}
