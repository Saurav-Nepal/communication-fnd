import { CommentDocumentController } from './comment.document.controller';

export class CommonPaymentController extends CommentDocumentController {
    protected listFilter: any;

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = this.listFilter;

        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;
        return this.get();
    }

    async disputes(id: number) {
        this.api = `${this.endPoint}/${id}/disputes`;
        return this.get();
    }
}
