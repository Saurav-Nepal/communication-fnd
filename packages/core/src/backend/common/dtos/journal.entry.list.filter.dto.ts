import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CommonListFilterDto } from './common.list.filter.dto';

export class JournalEntryListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    @IsBoolean()
    needs_sync?: boolean;

    @Expose()
    @IsOptional()
    @IsNumber()
    type_id?: number;
}
