import { ApiSecretPayloadDto } from '../dtos/api.secret.payload.dto';
import { BankAccountAttachDto } from '../dtos/bank.account.attach.dto';
import { RelayWebhookDto } from '../dtos/relay.webhook.dto';
import { TemplateFileUploadDto } from '../dtos/template.file.upload.dto';
import { CommonPersonController } from './common.person.controller';

export class CommonPgController extends CommonPersonController {
    async validateRelay(id: number) {
        this.api = `${this.endPoint}/${id}/relay-validate`;
        this.bodyDto = RelayWebhookDto;

        return this.post();
    }

    async setRelay(id: number) {
        this.api = `${this.endPoint}/${id}/relay-set`;
        this.bodyDto = RelayWebhookDto;

        return this.post();
    }

    async unSetRelay(id: number) {
        this.api = `${this.endPoint}/${id}/relay`;

        return this.delete();
    }

    async enableRelay(id: number) {
        this.api = `${this.endPoint}/${id}/relay-enable`;

        return this.post();
    }

    async setBankAccount(id: number) {
        this.api = `${this.endPoint}/${id}/bank-account`;
        this.bodyDto = BankAccountAttachDto;

        return this.post();
    }

    async validateCredential(id: number) {
        this.api = `${this.endPoint}/${id}/validate-credential`;
        this.bodyDto = ApiSecretPayloadDto;

        return this.post();
    }

    async setCredential(id: number) {
        this.api = `${this.endPoint}/${id}/set-credential`;
        this.bodyDto = ApiSecretPayloadDto;

        return this.post();
    }

    async getCsvTemplates(id: number) {
        this.api = `${this.endPoint}/${id}/csv-templates`;

        return this.get();
    }

    async getFileUploads(id: number) {
        this.api = `${this.endPoint}/${id}/file-uploads`;

        return this.get();
    }

    async uploadFile(id: number) {
        this.api = `${this.endPoint}/${id}/file-upload`;
        this.bodyDto = TemplateFileUploadDto;
        return this.post();
    }
}
