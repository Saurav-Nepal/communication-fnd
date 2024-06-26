import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CurrencyRateListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @IsNumber()
    @Expose()
    currency_id?: number;
}
