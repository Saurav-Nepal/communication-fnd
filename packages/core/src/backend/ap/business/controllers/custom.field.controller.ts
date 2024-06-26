import { BaseModel } from '../../../../Models/base.models';
import { AddCustomFieldDto } from '../dtos/add.custom.field.dto';
import { CustomFieldListFilterDto } from '../dtos/custom.field.list.filter.dto';
import { ModifyCustomFieldStatusDto } from '../dtos/modify.custom.field.status.dto';

export class CustomFieldController extends BaseModel {
    protected endPoint = 'api/b/custom-field';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = CustomFieldListFilterDto;

        return this.post();
    }

    async getAll() {
        this.api = this.endPoint;
        return this.get();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;
        return this.get();
    }

    async create() {
        this.api = `${this.endPoint}`;
        this.bodyDto = AddCustomFieldDto;
        return this.post();
    }

    async activate(id: number) {
        this.api = `${this.endPoint}/${id}/set-active`;
        this.body = { active: true };
        this.bodyDto = ModifyCustomFieldStatusDto;
        return this.post();
    }
    async deactivate(id: number) {
        this.api = `${this.endPoint}/${id}/set-active`;
        this.body = { active: false };
        this.bodyDto = ModifyCustomFieldStatusDto;

        return this.post();
    }

    async mandatory(id: number) {
        this.api = `${this.endPoint}/${id}/set-active`;
        this.body = { is_mandatory: true };
        this.bodyDto = ModifyCustomFieldStatusDto;

        return this.post();
    }
    async demandatory(id: number) {
        this.api = `${this.endPoint}/${id}/set-active`;
        this.body = { is_mandatory: false };
        this.bodyDto = ModifyCustomFieldStatusDto;

        return this.post();
    }
}
