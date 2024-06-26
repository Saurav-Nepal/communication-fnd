import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddGstHoldPaymentDto {
    @Expose()
    @IsNotEmpty()
    comments: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    expense_id: number;
}