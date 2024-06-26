import { BaseModel } from '../../../../Models/base.models';
import { AddCommentDto } from '../../../common/dtos/add.comment.dto';
import { CommentCreationDto } from '../../../common/dtos/comment.creation.dto';
import { OnHoldReasonPayloadDto } from '../../../common/dtos/on.hold.reason.payload.dto';

export class CommonOnHoldController extends BaseModel {
    protected endPoint: string;

    async getAll(id: number) {
        this.api = `${this.endPoint}/${id}/hold`;

        return this.get();
    }
    async setHold(id: number) {
        this.api = `${this.endPoint}/${id}/hold`;
        this.bodyDto = OnHoldReasonPayloadDto;

        return this.post();
    }
    async unsetHold({ id, onholdId }: { id: number; onholdId: number }) {
        this.api = `${this.endPoint}/${id}/hold/${onholdId}/un-set`;
        this.bodyDto = AddCommentDto;

        return this.post();
    }

    async updateReason({ id, onholdId }: { id: number; onholdId: number }) {
        this.api = `${this.endPoint}/${id}/hold/${onholdId}/reason`;
        this.bodyDto = OnHoldReasonPayloadDto;

        return this.post();
    }

    async setComments({ id, onholdId }: { id: number; onholdId: number }) {
        this.api = `${this.endPoint}/${id}/hold/${onholdId}/comment`;
        this.bodyDto = CommentCreationDto;

        return this.post();
    }

    async deleteComment({
        id,
        onholdId,
        dataId,
    }: {
        id: number;
        onholdId: number;
        dataId: number;
    }) {
        this.api = `${this.endPoint}/${id}/hold/${onholdId}/comment/${dataId}`;
        return this.delete();
    }

    async getComments({ id, onholdId }: { id: number; onholdId: number }) {
        this.api = `${this.endPoint}/${id}/hold/${onholdId}/comments`;
        return this.get();
    }
}
