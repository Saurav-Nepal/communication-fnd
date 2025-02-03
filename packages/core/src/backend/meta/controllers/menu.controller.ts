import { BaseModel } from '../../../Models/base.models';
import { user } from '../../../Models/User';

export class MenuController extends BaseModel {
    private endPoint = 'api/product';

    async list() {
        const product_id = 1;

        this.api = `${this.endPoint}/${product_id}/menu`;

        return this.get();
    }

    async show(id: number) {
        const product_id = 1;

        this.api = `${this.endPoint}/${product_id}/menu/${id}`;

        return this.get();
    }
}
