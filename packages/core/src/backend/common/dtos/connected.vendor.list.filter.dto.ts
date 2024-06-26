import { Expose } from "class-transformer";
import { IsNumber } from "class-validator";
import { CommonListFilterDto } from "./common.list.filter.dto";

export class ConnectedBusinessVendorListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsNumber()
    vendor_account_id: number;
}