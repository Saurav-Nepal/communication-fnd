import { BaseModel } from '../../../Models/base.models';

export class LookupController extends BaseModel {
    protected endPoint = 'api/lookup-value';

    async list(id: number) {
        this.api = `${this.endPoint}/${id}`;

        return this.get();
    }

    async find(id: number) {
        this.api = `api/lookup-type/${id}/values`;
        return this.get();
    }
    async show(id: number) {
        this.api = `api/lookup-value/${id}`;
        return this.get();
    }
}
