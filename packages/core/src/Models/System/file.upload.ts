import { BaseModel } from '../base.models';
import { DocumentUploadDto } from '../dto/document.upload.dto';

export class FileUpload extends BaseModel {
    protected api = 'api/document';
    protected method = this.post;
    protected bodyDto = DocumentUploadDto;
}
