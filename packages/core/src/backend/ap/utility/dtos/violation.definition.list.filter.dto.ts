import { Expose } from "class-transformer";
import { IsOptional, IsNumber, IsBoolean } from "class-validator";
import { CommonListFilterDto } from "../../../common/dtos/common.list.filter.dto";

export class ViolationDefinitionListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    source_type?: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    column_id?: number;

    @Expose()
    @IsOptional()
    @IsNumber()
    type_id?: number;
    
    @Expose()
    @IsOptional()
    @IsBoolean()
    needs_customer_info?: boolean;
}