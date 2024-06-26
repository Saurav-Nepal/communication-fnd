import { Expose, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import 'reflect-metadata';
import { CommonListFilterDto } from './common.list.filter.dto';
import { SourceFilterDto } from './source.filter.dto';

export class ProcessingDateListFilterDto extends CommonListFilterDto {
    @IsOptional()
    @ValidateNested()
    @Expose()
    @Type(() => SourceFilterDto)
    source: SourceFilterDto;
}
