import { BaseModel } from '../../../Models/base.models';
import { DocumentFileUploadDto } from '../../ap/business/dtos/document.file.upload.dto';
import { AddCommentDto } from '../dtos/add.comment.dto';

export default class BankDocumentController extends BaseModel {
    protected endPoint: string;

    async setDocument({
        sourceId,
        bankId,
    }: {
        sourceId: number;
        bankId: number;
    }) {
        this.api = `${this.endPoint}/${sourceId}/bank-account/${bankId}/document`;
        this.bodyDto = DocumentFileUploadDto;
        return this.post();
    }
    async getDocuments({
        bankId,
        sourceId,
    }: {
        bankId: number;
        sourceId: number;
    }) {
        this.api = `${this.endPoint}/${sourceId}/bank-account/${bankId}/documents`;
        return this.get();
    }

    async deleteDocument({
        sourceId,
        bankId,
        fileId,
    }: {
        sourceId: number;
        bankId: number;
        fileId: number;
    }) {
        this.api = `${this.endPoint}/${sourceId}/vdocument/${bankId}/file/${fileId}`;
        return this.delete();
    }

    async getConversations({
        bankId,
        sourceId,
    }: {
        bankId: number;
        sourceId: number;
    }) {
        this.api = `${this.endPoint}/${sourceId}/bank-account/${bankId}/conversations`;
        return this.get();
    }

    async createConversation({
        bankId,
        sourceId,
    }: {
        bankId: number;
        sourceId: number;
    }) {
        this.api = `${this.endPoint}/${sourceId}/bank-account/${bankId}/conversation`;
        this.bodyDto = AddCommentDto;

        return this.post();
    }

    async deleteComment({
        sourceId,
        bankId,
        dataId,
    }: {
        sourceId: number;
        bankId: number;
        dataId: number;
    }) {
        this.api = `${this.endPoint}/${sourceId}/bank-account/${bankId}/conversation/${dataId}`;
        return this.delete();
    }
}
