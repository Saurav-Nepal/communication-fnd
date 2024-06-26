import { BaseModel } from '../../../Models/base.models';
import { BulkUploadItemListFilterDto } from '../../ap/business/dtos/bulk.upload.item.filter.payload.dto';
import { AddIntegrationBulkFilePayloadDto } from '../dtos/add.integration.bulk.file.payload.dto';
import { CommonListFilterDto } from '../dtos/common.list.filter.dto';

export class BusinessIntegrationFileController extends BaseModel {
    protected endPoint = 'api/b/integration';

    async list(id: number) {
        this.api = `${this.endPoint}/${id}/file/search`;
        this.bodyDto = CommonListFilterDto;

        return this.post();
    }
    async listItem({ id, file_id }: { id: number; file_id: number }) {
        this.api = `${this.endPoint}/${id}/file/${file_id}/search`;
        this.bodyDto = BulkUploadItemListFilterDto;

        return this.post();
    }
    async listItemDefinition({ id, file_id }: { id: number; file_id: number }) {
        this.api = `${this.endPoint}/${id}/file/${file_id}/definition`;

        return this.post();
    }
    async getSupportedFiles(id: number) {
        this.api = `${this.endPoint}/${id}/file/supported-files`;

        return this.get();
    }

    async uploadFile(id: number) {
        this.api = `${this.endPoint}/${id}/file/file-upload`;
        this.bodyDto = AddIntegrationBulkFilePayloadDto;

        return this.post();
    }
}
