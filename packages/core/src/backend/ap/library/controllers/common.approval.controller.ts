import { AddManualApprovalDto } from '../dtos/add.manual.approval.dto';
import { ApprovalPayloadDto } from '../dtos/approval.payload.dto';
import { ApprovalUserTransferDto } from '../dtos/approval.user.transfer.dto';
import { ResetApprovalDto } from '../dtos/reset.approval.dto';
import { BaseModel } from '../../../../Models/base.models';

export class CommonApprovalController extends BaseModel {
    protected endPoint: string;

    async getAll(id: number) {
        this.api = `${this.endPoint}/${id}/approval`;
        return this.get();
    }

    async reset(id: number) {
        this.api = `${this.endPoint}/${id}/approval/reset`;
        this.bodyDto = ResetApprovalDto;

        return this.post();
    }

    async cleanup(id: number) {
        this.api = `${this.endPoint}/${id}/approval/cleanup`;
        this.bodyDto = ResetApprovalDto;

        return this.post();
    }

    async addStep(id: number) {
        this.api = `${this.endPoint}/${id}/approval/add`;
        this.bodyDto = AddManualApprovalDto;

        return this.post();
    }

    async bypassStatus(id: number) {
        this.api = `${this.endPoint}/${id}/approval/status`;
        this.bodyDto = ApprovalPayloadDto;

        return this.post();
    }

    async approve(id: number) {
        this.api = `${this.endPoint}/${id}/approval`;
        this.bodyDto = ApprovalPayloadDto;

        return this.post();
    }

    async transfer({ expenseId, id }: { expenseId: number; id: number }) {
        this.api = `${this.endPoint}/${expenseId}/approval/${id}/transfer`;
        this.bodyDto = ApprovalUserTransferDto;

        return this.post();
    }
    async dropTransfer({ expenseId, id }: { expenseId: number; id: number }) {
        this.api = `${this.endPoint}/${expenseId}/approval/${id}/transfer`;
        return this.delete();
    }

    async skipLevel({ expenseId, id }: { expenseId: number; id: number }) {
        this.api = `${this.endPoint}/${expenseId}/approval/${id}/skip`;
        return this.post();
    }
    async dropSkipLevel({ expenseId, id }: { expenseId: number; id: number }) {
        this.api = `${this.endPoint}/${expenseId}/approval/${id}/skip`;
        return this.delete();
    }
}
