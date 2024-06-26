import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { DocumentFileUploadDto } from "./document.file.upload.dto";

export class AddBusinessManagedVendorKycDocumentDto extends DocumentFileUploadDto {
    @Expose()
    @IsNotEmpty()
    token: string;
}