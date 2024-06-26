import { Expose, Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    ValidateNested,
} from 'class-validator';
import { AddChequePaymentDto } from './add.cheque.payment.dto';

export class AddBusinessPaymentDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @Expose()
    @IsNotEmpty()
    @IsNumber()
    mode_id: number;

    @Expose()
    @IsOptional()
    comments: string;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => AddChequePaymentDto)
    cheque?: AddChequePaymentDto;

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => AddChequePaymentDto)
    dd?: AddChequePaymentDto;

    @Expose()
    @IsOptional()
    payment_date?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    conversion_rate?: number;

    @Expose()
    @IsOptional()
    @IsString()
    currency?: string;
}
