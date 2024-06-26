import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { BankAccountCreationDto } from "./bank.account.creation.dto";

export class PublicBankAccountCreationDto extends BankAccountCreationDto {
    @Expose()
    @IsNotEmpty()
    token: string;
}