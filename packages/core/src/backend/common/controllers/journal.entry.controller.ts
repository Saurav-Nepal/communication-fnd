import { BaseModel } from '../../../Models/base.models';
import { AddCommentDto } from '../dtos/add.comment.dto';
import { JournalEntryListFilterDto } from '../dtos/journal.entry.list.filter.dto';
import { StringSearchDto } from '../dtos/string.search.dto';

export default class JournalEntryController extends BaseModel {
    protected endPoint = 'api/b/journal-entry';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = JournalEntryListFilterDto;

        return this.post();
    }

    async find() {
        this.api = `${this.endPoint}/find`;
        this.bodyDto = StringSearchDto;

        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;
        return this.get();
    }

    async editNarration(id: number) {
        this.api = `${this.endPoint}/${id}/narration`;
        this.bodyDto = AddCommentDto;
        return this.post();
    }

    async markSynced(id: number) {
        this.api = `${this.endPoint}/${id}/mark-synced`;
        return this.post();
    }

    async markForSync(id: number) {
        this.api = `${this.endPoint}/${id}/enable-sync`;
        return this.post();
    }

    async putOnHold(id: number) {
        this.api = `${this.endPoint}/${id}/hold`;
        return this.post();
    }

    async removeHold(id: number) {
        this.api = `${this.endPoint}/${id}/remove-hold`;
        return this.post();
    }
}
