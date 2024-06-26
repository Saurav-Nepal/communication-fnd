import { IdPayloadDto } from '../../../common/dtos/id.payload.dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddCurrencyRateDto extends IdPayloadDto {
    @IsNumber()
    @Expose()
    @IsNotEmpty()
    currency_id?: number;

    @IsNotEmpty()
    @Expose()
    date: string;

    @IsNumber()
    @Expose()
    @IsNotEmpty()
    rate: number;
}
