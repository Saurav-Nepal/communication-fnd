import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class BusinessVendorListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @IsBoolean()
    active: boolean;

    @Expose()
    @IsNumber()
    @IsOptional()
    business_account_id?: number;

    @Expose()
    @IsNumber()
    @IsOptional()
    vendor_account_id?: number;

    @Expose()
    @IsBoolean()
    @IsOptional()
    is_msme?: boolean;

    @Expose()
    @IsBoolean()
    @IsOptional()
    is_vendor_managed?: boolean;

    @Expose()
    @IsArray()
    @IsOptional()
    created_by?: number[]
}
