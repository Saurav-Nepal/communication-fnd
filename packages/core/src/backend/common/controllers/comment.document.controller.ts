import { CommentCreationDto } from '../dtos/comment.creation.dto';
import { FilesUploadDto } from '../dtos/files.upload.dto';
import { ConversationController } from './conversation.controller';

export class CommentDocumentController extends ConversationController {
    protected endPoint: string;

    async getComments(id: number) {
        this.api = `${this.endPoint}/${id}/comments`;
        return this.get();
    }

    async setComments(id: number) {
        this.api = `${this.endPoint}/${id}/comment`;
        this.bodyDto = CommentCreationDto;

        return this.post();
    }

    async deleteComment({ id, dataId }: { id: number; dataId: number }) {
        this.api = `${this.endPoint}/${id}/comment/${dataId}`;
        return this.delete();
    }

    async getDocuments(id: number) {
        this.api = `${this.endPoint}/${id}/documents`;
        return this.get();
    }

    async createDocument(id: number) {
        this.api = `${this.endPoint}/${id}/document`;
        this.bodyDto = FilesUploadDto;

        return this.post();
    }

    async deleteDocument({ id, dataId }: { id: number; dataId: number }) {
        this.api = `${this.endPoint}/${id}/document/${dataId}`;
        return this.delete();
    }
}
