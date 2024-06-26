import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";

export class BusinessVendorConnectBusinessDto {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    business_account_id?: number;
}