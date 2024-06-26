import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { IdPayloadDto } from "../../../common/dtos/id.payload.dto";

export class AddTncDto extends IdPayloadDto {
    @Expose()
    @IsNotEmpty()
    description: string;

    @Expose()
    @IsOptional()
    @IsNumber()
    vendor_type_id?: number;
    
    @Expose()
    @IsNotEmpty()
    @IsNumber()
    priority: number;
}