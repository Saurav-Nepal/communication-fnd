import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';
import { Expose } from 'class-transformer';

export class ParsedStatementItemListFilterDto extends CommonListFilterDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    statement_id: number;

    @IsOptional()
    @IsBoolean()
    @Expose()
    active?: boolean;
}
