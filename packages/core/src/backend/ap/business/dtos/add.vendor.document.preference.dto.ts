import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class AddVendorDocumentPreferenceDto {
    @Expose()
    @IsNumber()
    @IsOptional()
    document_id?: number;

    @IsOptional()
    @Expose()
    name?: string;

    @IsOptional()
    @Expose()
    @IsBoolean()
    is_mandatory: boolean;

    @IsOptional()
    @Expose()
    @IsBoolean()
    is_document_mandatory?: boolean;
    
    @IsOptional()
    @Expose()
    description?: string;
    
    @IsOptional()
    @Expose()
    document_urls?: string[];
    
    @IsOptional()
    @Expose()
    @IsNumber()
    vendor_type_id?: number;
}
