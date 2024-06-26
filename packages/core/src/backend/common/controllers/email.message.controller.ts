import { AddTagDto } from '../dtos/add.tag.dto';
import { EmailMessageListFilterDto } from '../dtos/email.message.list.filter.dto';
import { CommentDocumentController } from './comment.document.controller';

export class EmailMessageController extends CommentDocumentController {
    protected endPoint = 'api/b/email-message';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = EmailMessageListFilterDto;
        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;
        return this.get();
    }

    async details(id: number) {
        this.api = `${this.endPoint}/${id}/details`;
        return this.get();
    }

    async getBody(id: number) {
        this.api = `${this.endPoint}/${id}/body`;
        return this.get();
    }

    async getAttachment(attributes: { id: number; attachmentId: number }) {
        this.api = `${this.endPoint}/${attributes.id}/attachment/${attributes.attachmentId}`;
        return this.get();
    }

    async setRead(id: number) {
        this.api = `${this.endPoint}/${id}/read`;
        return this.post();
    }

    async setUnRead(id: number) {
        this.api = `${this.endPoint}/${id}/un-read`;
        return this.post();
    }

    async setArchive(id: number) {
        this.api = `${this.endPoint}/${id}/archive`;
        return this.post();
    }

    async setUnArchive(id: number) {
        this.api = `${this.endPoint}/${id}/un-archive`;
        return this.post();
    }

    async drop(id: number) {
        this.api = `${this.endPoint}/${id}`;
        return this.delete();
    }

    async attachExpense({
        emailId,
        expenseId,
    }: {
        emailId: number;
        expenseId: number;
    }) {
        this.api = `${this.endPoint}/${emailId}/attach-expense/${expenseId}`;
        return this.post();
    }

    async setTag(emailId: number) {
        this.api = `${this.endPoint}/${emailId}/tag`;
        this.bodyDto = AddTagDto;

        return this.post();
    }

    async deleteTag({ emailId, tagId }: { emailId: number; tagId: number }) {
        this.api = `${this.endPoint}/${emailId}/tag/${tagId}`;
        return this.delete();
    }
}
