import { BaseModel } from '../../../Models/base.models';
import { AddCommentDto } from '../dtos/add.comment.dto';

export class ConversationController extends BaseModel {
    protected endPoint: string;

    async getConversations(id: number) {
        this.api = `${this.endPoint}/${id}/conversations`;
        return this.get();
    }

    async createConversation(id: number) {
        this.api = `${this.endPoint}/${id}/conversation`;
        this.bodyDto = AddCommentDto;

        return this.post();
    }

    async deleteComment({ id, dataId }: { id: number; dataId: number }) {
        this.api = `${this.endPoint}/${id}/conversation/${dataId}`;
        return this.delete();
    }
}
