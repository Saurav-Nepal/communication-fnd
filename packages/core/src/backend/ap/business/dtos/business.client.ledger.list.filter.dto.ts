
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { DateFilterDto } from '../../../../Models/dto/date.filter.dto';

export class BusinessClientLedgerListFilterDto {
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    billing_id: number;

    @Expose()
    @IsNotEmpty()
    date: DateFilterDto;
}
