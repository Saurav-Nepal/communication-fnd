import { Expose } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";
import { StringSearchDto } from "../../../common/dtos/string.search.dto";

export class TncFindDto extends StringSearchDto {
    @Expose()
    @IsOptional()
    @IsNumber()
    vendor_type_id?: number;

}