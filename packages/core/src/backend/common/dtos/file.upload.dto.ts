import { Expose, Type } from 'class-transformer';
import {
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import 'reflect-metadata';
import { DocumentAttributesDto } from './document.attributes.dto';

export class FileUploadDto {
    @IsOptional()
    @IsNumber()
    @Expose()
    id?: number;

    @IsNotEmpty()
    @Expose()
    document_url: string;

    @IsOptional()
    @Expose()
    comments?: string;

    @IsOptional()
    @Expose()
    @Type(() => DocumentAttributesDto)
    @ValidateNested()
    attributes?: DocumentAttributesDto;
}
