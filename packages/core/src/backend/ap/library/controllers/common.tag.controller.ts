import { BaseModel } from '../../../../Models/base.models';
import { AddCommentDto } from '../../../common/dtos/add.comment.dto';
import { AddTagDto } from '../../../common/dtos/add.tag.dto';
import { OnHoldReasonPayloadDto } from '../../../common/dtos/on.hold.reason.payload.dto';

export class CommonTagController extends BaseModel {
    protected endPoint: string;

    async getAll(id: number) {
        this.api = `${this.endPoint}/${id}/tag`;
        return this.get();
    }

    async setTag(id: number) {
        this.api = `${this.endPoint}/${id}/tag`;
        this.bodyDto = AddTagDto;

        return this.post();
    }
    async deleteTag({ expenseId, id }: { expenseId: number; id: number }) {
        this.api = `${this.endPoint}/${expenseId}/tag/${id}`;

        return this.delete();
    }
}
