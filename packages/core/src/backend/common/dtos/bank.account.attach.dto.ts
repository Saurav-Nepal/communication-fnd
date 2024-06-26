import { Expose } from 'class-transformer';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class BankAccountAttachDto {
    @Expose()
    @IsNotEmpty()
    @IsPositive()
    bank_account_id: number;
}
