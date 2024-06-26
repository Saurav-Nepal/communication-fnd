import { Expose, Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    ValidateNested,
} from 'class-validator';
import 'reflect-metadata';
import { FileUploadDto } from '../../../common/dtos/file.upload.dto';

export class TrackingDocumentDto {
    @IsNotEmpty()
    @Expose()
    @IsNumber()
    type_id: number;

    @IsOptional()
    @Expose()
    identifier?: string;

    @IsOptional()
    @IsISO8601()
    @Expose()
    expiry_date: Date;

    @IsOptional()
    @Expose()
    custom_field_data: any;

    @IsOptional()
    @Expose()
    @ValidateNested()
    @Type(() => FileUploadDto)
    @IsArray()
    files: FileUploadDto[];

    @IsOptional()
    @Expose()
    @IsBoolean()
    is_new_version?: boolean;

}
