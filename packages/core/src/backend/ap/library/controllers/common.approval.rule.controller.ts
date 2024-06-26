import { AddApprovalRuleDto } from '../dtos/add.approval.rule.dto';
import { ApprovalRuleListFilterDto } from '../../workflow/dtos/approval.rule.list.filter.dto';
import { EditApprovalRuleDto } from '../dtos/edit.approval.rule.dto';
import { StringSearchDto } from '../../../common/dtos/string.search.dto';
import { BaseModel } from '../../../../Models/base.models';

export class CommonApprovalRuleController extends BaseModel {
    protected endPoint: string;

    async search() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = ApprovalRuleListFilterDto;
        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;

        return this.get();
    }

    async showRaw(id: number) {
        this.api = `${this.endPoint}/${id}/raw`;

        return this.get();
    }

    async find() {
        this.api = `${this.endPoint}/find`;
        this.bodyDto = StringSearchDto;

        return this.post();
    }

    async create() {
        this.api = this.endPoint;
        this.bodyDto = AddApprovalRuleDto;

        return this.post();
    }

    async update(id: number) {
        this.api = `${this.endPoint}/${id}`;
        this.bodyDto = EditApprovalRuleDto;

        return this.put();
    }

    async activate(id: number) {
        this.api = `${this.endPoint}/${id}/activate`;
        return this.post();
    }

    async deactivate(id: number) {
        this.api = `${this.endPoint}/${id}/deactivate`;
        return this.post();
    }
}
