import { user } from '../../../Models/User';
import { BaseModel } from '../../../Models/base.models';

export class MenuController extends BaseModel {
    private endPoint = 'api/product';

    async list() {
        const product_id = user.getProductId();

        this.api = `${this.endPoint}/${product_id}/menu`;

        return this.get();
    }

    async show(id: number) {
        const product_id = user.getProductId();

        this.api = `${this.endPoint}/${product_id}/menu/${id}`;

        return this.get();
    }
}
