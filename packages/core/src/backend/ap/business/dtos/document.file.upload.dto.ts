import { Expose, Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { FileUploadDto } from '../../../common/dtos/file.upload.dto';
import 'reflect-metadata';
export class DocumentFileUploadDto {
    @IsOptional()
    @Expose()
    @ValidateNested()
    @Type(() => FileUploadDto)
    @IsArray()
    files: FileUploadDto[];

    @IsOptional()
    @Expose()
    @IsString()
    identifier: string;
}
