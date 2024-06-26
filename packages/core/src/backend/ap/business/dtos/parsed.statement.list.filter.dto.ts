import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';

export class ParsedStatementListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    card_id?: number;
}
