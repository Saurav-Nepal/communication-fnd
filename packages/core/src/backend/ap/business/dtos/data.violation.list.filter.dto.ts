import { Expose } from "class-transformer";
import { IsOptional, IsNumber } from "class-validator";
import { CommonListFilterDto } from "../../../common/dtos/common.list.filter.dto";

export class DataViolationListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    status_id?: number;

    @Expose()
    @IsOptional()
    source_type?: string;
    
    @Expose()
    @IsOptional()
    @IsNumber()
    source_id?: number;
}