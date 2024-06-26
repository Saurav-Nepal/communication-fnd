import { Expose } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { CommonListFilterDto } from './common.list.filter.dto';

export class SourceMapListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsBoolean()
    @IsOptional()
    is_conflict?: boolean;
}