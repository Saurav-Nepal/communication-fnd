import { Expose, Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { FileUploadDto } from './file.upload.dto';
export class FilesUploadDto {
    @Expose()
    @Type(() => FileUploadDto)
    @IsArray()
    @ValidateNested()
    files: FileUploadDto[];
}
