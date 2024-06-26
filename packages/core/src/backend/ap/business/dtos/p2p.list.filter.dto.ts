import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CommonListFilterDto } from '../../../common/dtos/common.list.filter.dto';

export class P2pListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    customer_id?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    source_id?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    status_id?: number;

    @Expose()
    @IsOptional()
    @IsBoolean()
    active?: boolean;
}
