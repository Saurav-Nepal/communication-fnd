import { IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Expose } from 'class-transformer';

export class DocumentUploadDto {
    @Expose()
    @IsNotEmpty()
    source_type: string;

    @Expose()
    @IsNotEmpty()
    source_id: number;

    @IsOptional()
    @Expose()
    type_id: number;

    @IsNotEmpty()
    @Expose()
    @IsUrl()
    document_url: string;

    @IsOptional()
    @Expose()
    attributes: {};
}
