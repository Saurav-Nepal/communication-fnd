import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { TrackingDocumentDto } from "./tracking.document.dto";

export class BusinessManagedVendorKycDocumentDto extends TrackingDocumentDto {
    @Expose()
    @IsNotEmpty()
    token: string;
}