import { CommonPersonListFilterDto } from '../dtos/common.person.list.filter.dto';
import { ContactPersonCreationDto } from '../dtos/contact.person.creation.dto';
import { CommentDocumentController } from './comment.document.controller';

export class CommonPersonController extends CommentDocumentController {
    async getContactPersons(id: number) {
        this.api = `${this.endPoint}/${id}/contact-persons/search`;
        this.bodyDto = CommonPersonListFilterDto;
        return this.post();
    }

    async createContactPerson(id: number) {
        this.api = `${this.endPoint}/${id}/contact-person`;
        this.bodyDto = ContactPersonCreationDto;

        return this.post();
    }

    async deleteContactPerson({
        sourceId,
        id,
    }: {
        sourceId: number;
        id: number;
    }) {
        this.api = `${this.endPoint}/${sourceId}/contact-person/${id}`;

        return this.delete();
    }
}
