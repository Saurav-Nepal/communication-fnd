import { IdPayloadDto } from '../../../common/dtos/id.payload.dto';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class AddBusinessCurrencyDto extends IdPayloadDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    currency_id: number;

    @Expose()
    @IsNumber()
    @IsNotEmpty()
    rate: number;

    @Expose()
    @IsBoolean()
    @IsNotEmpty()
    sync?: boolean;
}
