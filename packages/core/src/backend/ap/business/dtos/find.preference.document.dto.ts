import { Expose } from "class-transformer";
import { IsOptional, IsNumber, IsBoolean, IsString } from "class-validator";

export class FindPreferenceDocumentDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    vendor_type_id?: number;

    @Expose()
    @IsString()
    @IsOptional()
    str?: string;
}