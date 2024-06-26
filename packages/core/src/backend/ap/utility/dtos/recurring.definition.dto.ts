import { Expose } from 'class-transformer';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';
import { RecurringPeriodEnum } from '../../../../Constants/preference.constants';

export class RecurringDefinitionDto {
    @Expose()
    @IsNotEmpty()
    @IsEnum(RecurringPeriodEnum)
    type_id: number;

    @Expose()
    @IsNotEmpty()
    @IsArray()
    value: string[] | number[];
}
