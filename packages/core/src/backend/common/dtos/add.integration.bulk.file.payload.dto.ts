import { Expose, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { FileUploadDto } from './file.upload.dto';

export class AddIntegrationBulkFilePayloadDto {
    @Expose()
    @IsNumber()
    @IsNotEmpty()
    type_id: number;

    @Expose()
    @Type(() => FileUploadDto)
    @ValidateNested()
    @IsNotEmpty()
    file: FileUploadDto | FileUploadDto[];
}
