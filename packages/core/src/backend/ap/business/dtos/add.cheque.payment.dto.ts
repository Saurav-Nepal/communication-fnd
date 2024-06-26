import { Expose } from 'class-transformer';
import { IsISO8601, IsNotEmpty } from 'class-validator';

export class AddChequePaymentDto {
    @IsNotEmpty()
    @Expose()
    payee_name?: string;

    @IsNotEmpty()
    @Expose()
    instrument_identifier: string;

    @IsNotEmpty()
    @IsISO8601()
    @Expose()
    issue_date: Date;
}
