import { BaseModel } from '../../../../Models/base.models';
import { StringSearchDto } from '../../../common/dtos/string.search.dto';
import { UpiPaymentListFilterDto } from '../dtos/upi.payment.list.filter.dto';

export class UpiPaymentController extends BaseModel {
    protected endPoint = 'api/b/upi-payment';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = UpiPaymentListFilterDto;

        return this.post();
    }

    async find() {
        this.api = `${this.endPoint}/find`;
        this.bodyDto = StringSearchDto;

        return this.post();
    }

    async show(id: number) {
        this.api = `${this.endPoint}/${id}`;
        return this.get();
    }
}
