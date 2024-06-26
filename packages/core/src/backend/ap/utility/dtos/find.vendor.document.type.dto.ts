import { Expose } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { StringSearchDto } from "../../../common/dtos/string.search.dto";

export class FindVendorDocumentTypeDto extends StringSearchDto {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    vendor_type_id: number;
}