import { Expose, Type } from "class-transformer";
import { IsOptional, IsArray, ValidateNested, IsNumber } from "class-validator";
import { CommonListFilterDto } from "../../../common/dtos/common.list.filter.dto";
import { PartyStatusFilterDto } from "../../workflow/dtos/party.status.filter.dto";

export class VendorAdvanceListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    vendor_account_id?: number[];
    @Expose()
    @IsOptional()
    @IsArray()
    category_id?: number[];
    @Expose()
    @IsOptional()
    @IsArray()
    department_id?: number[];
    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => PartyStatusFilterDto)
    party_status?: PartyStatusFilterDto;
    @IsOptional()
    @Expose()
    @IsArray()
    party_status_id?: number[];
    @IsOptional()
    @Expose()
    @IsNumber()
    type_id?: number;
}