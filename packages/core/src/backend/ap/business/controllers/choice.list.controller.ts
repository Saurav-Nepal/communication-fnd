import { BaseModel } from '../../../../Models/base.models';
import { AddChoiceListDto } from '../../../ap/business/dtos/add.choice.list.dto';
import { StringSearchDto } from '../../../common/dtos/string.search.dto';

export class ChoiceListController extends BaseModel {
    protected endPoint = 'api/b/choice-type';

    async getAll(type: number) {
        this.api = `${this.endPoint}/${type}/list`;
        return this.get();
    }

    async show({ type, id }: { type: number; id: number }) {
        this.api = `${this.endPoint}/${type}/list/${id}`;
        return this.get();
    }

    async find(type: number) {
        this.api = `${this.endPoint}/${type}/list/find`;
        this.bodyDto = StringSearchDto;
        return this.post();
    }

    async create(type: number) {
        this.api = `${this.endPoint}/${type}/list`;
        this.bodyDto = AddChoiceListDto;
        return this.post();
    }

    async activate({ type, id }: { type: number; id: number }) {
        this.api = `${this.endPoint}/${type}/list/${id}/activate`;
        return this.post();
    }

    async deactivate({ type, id }: { type: number; id: number }) {
        this.api = `${this.endPoint}/${type}/list/${id}/deactivate`;
        return this.post();
    }
}
