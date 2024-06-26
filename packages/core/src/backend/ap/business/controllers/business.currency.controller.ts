import { BaseModel } from '../../../../Models/base.models';
import { StringSearchDto } from '../../../common/dtos/string.search.dto';
import { AddBusinessCurrencyDto } from '../dtos/add.business.currency.dto';
import { BusinessCurrencyListFilterDto } from '../dtos/business.currency.list.filter.dto';

export class BusinessCurrencyController extends BaseModel {
    protected endPoint: string = `api/b/currency`;

    async search() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = BusinessCurrencyListFilterDto;

        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;

        return this.get();
    }

    async find() {
        this.api = `${this.endPoint}/find`;
        this.bodyDto = StringSearchDto;

        return this.post();
    }

    async getAll() {
        this.api = `${this.endPoint}`;
        return this.get();
    }

    async getSupportedCurrencies() {
        this.api = `${this.endPoint}/get-supported-currencies`;
        return this.get();
    }

    async create() {
        this.api = `${this.endPoint}`;
        this.bodyDto = AddBusinessCurrencyDto;
        return this.post();
    }

    async activate(id: number) {
        this.api = `${this.endPoint}/${id}/activate`;
        return this.post();
    }

    async deactivate(id: number) {
        this.api = `${this.endPoint}/${id}/deactivate`;
        return this.post();
    }

    async activateSync(id: number) {
        this.api = `${this.endPoint}/${id}/activate-sync`;
        return this.post();
    }
    async deactivateSync(id: number) {
        this.api = `${this.endPoint}/${id}/deactivate-sync`;
        return this.post();
    }
}
