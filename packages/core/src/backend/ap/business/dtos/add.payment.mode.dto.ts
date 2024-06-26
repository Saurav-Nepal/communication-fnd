import { Expose } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PaymentModeTypeEnum } from '../../../../Constants/preference.constants';

export class AddPaymentModeDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    id?: number;

    @Expose()
    @IsNotEmpty()
    name?: string;

    @IsNumber()
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    @IsEnum(PaymentModeTypeEnum)
    type_id?: number;

    @Expose()
    @IsNumber()
    @IsOptional()
    bank_id?: number;
}
