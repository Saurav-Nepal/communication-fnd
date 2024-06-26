import { CommonListFilterDto } from "../../../common/dtos/common.list.filter.dto";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
export class BusinessIntegrationListFilterDto extends CommonListFilterDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    integration_id?: number;

    @Expose()
    @IsOptional()
    @IsNotEmpty()
    name?:string;
}