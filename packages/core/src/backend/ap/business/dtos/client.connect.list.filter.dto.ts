import { Expose, Type } from 'class-transformer';
import { IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { ApprovalFilterDto } from './approval.filter.dto';

export class ClientConnectListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @Expose()
    @Type(() => ApprovalFilterDto)
    @ValidateNested()
    approval?: ApprovalFilterDto;

    @IsOptional()
    @Expose()
    @IsNumber()
    business_account_id?: number;

    @IsOptional()
    @Expose()
    @IsNumber()
    vendor_account_id?: number;

    @IsOptional()
    @Expose()
    @IsNumber()
    vendor_type_id?: number;
}
