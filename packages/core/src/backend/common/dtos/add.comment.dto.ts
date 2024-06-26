import { IsNotEmpty, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { FileUploadDto } from './file.upload.dto';
import "reflect-metadata";

export class AddCommentDto {
    @IsNotEmpty()
    @Expose()
    comments: string;

    @IsOptional()
    @IsNumber()
    @Expose()
    parent_id?: number;

    @IsOptional()
    @Expose()
    context?: any

    @Expose()
    @IsOptional()
    @ValidateNested()
    @Type(() => FileUploadDto)
    files?: FileUploadDto[];
}
