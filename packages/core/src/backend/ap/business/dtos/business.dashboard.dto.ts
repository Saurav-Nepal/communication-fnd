import { Expose, Type } from "class-transformer";
import { IsArray, ArrayMinSize } from "class-validator";
import { CommonDashboardPayloadDto } from "../../utility/dtos/common.dashboard.payload.dto";

export class BusinessDashboardDto {
    @IsArray()
    @ArrayMinSize(1, { message: 'At least one item is required' })
    @Expose()
    // @Type(() => CommonDashboardPayloadDto)
    slugs: any[];
}