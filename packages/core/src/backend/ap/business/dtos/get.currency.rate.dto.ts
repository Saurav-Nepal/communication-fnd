import { Expose } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsISO8601 } from 'class-validator';

export class GetCurrencyRateDto {
    @IsNumber()
    @Expose()
    @IsNotEmpty()
    currency_id?: number;

    @IsNotEmpty()
    @Expose()
    date: string;
}
