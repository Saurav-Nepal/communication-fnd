import { FileUploadDto } from './file.upload.dto';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class PublicFileUploadDto extends FileUploadDto {
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    access_key: number;
}
