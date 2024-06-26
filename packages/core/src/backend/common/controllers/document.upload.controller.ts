import { BaseModel } from '../../../Models/base.models';
import { CommonListFilterDto } from '../dtos/common.list.filter.dto';
import { DocumentRemoveDto } from '../dtos/document.remove.payload.dto';
import { DocumentUploadDto } from '../dtos/document.upload.payload.dto copy';

export class DocumentUploadController extends BaseModel {
    private endPoint = `api/b/document-upload`;

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;
        return this.get();
    }

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = CommonListFilterDto;

        return this.post();
    }

    async upload() {
        this.api = this.endPoint;
        this.bodyDto = DocumentUploadDto;

        return this.post();
    }

    async remove() {
        this.api = `${this.endPoint}/remove-document`;
        this.bodyDto = DocumentRemoveDto;

        return this.post();
    }
}
