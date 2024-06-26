import { Expose } from 'class-transformer';

export class DocumentUploadDto {
    @Expose()
    file: FormData;
}
