import { Expose } from "class-transformer";
import { BankAccountCreationDto } from "./bank.account.creation.dto";
import { IsNumber } from "class-validator";

export class BillingBankAccountCreationDto extends BankAccountCreationDto{
    @Expose()
    @IsNumber()
    billing_id: number;
}