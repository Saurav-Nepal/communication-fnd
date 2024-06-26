import { BaseModel } from '../../../../Models/base.models';
import { StringSearchDto } from '../../../common/dtos/string.search.dto';
import { UpiRefundListFilterDto } from '../dtos/upi.refund.list.filter.dto';

export class UpiRefundController extends BaseModel {
    protected endPoint = 'api/b/upi-refund';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = UpiRefundListFilterDto;

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
