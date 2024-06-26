import { Expose } from "class-transformer";
import { IsOptional, IsNumber } from "class-validator";
import { CommonListFilterDto } from "../../../common/dtos/common.list.filter.dto";

export class BusinessViolationListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    source_type?: string;
    
    @Expose()
    @IsOptional()
    @IsNumber()
    definition_id?: number;
}