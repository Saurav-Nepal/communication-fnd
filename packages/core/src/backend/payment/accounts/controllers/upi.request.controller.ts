import { BaseModel } from '../../../../Models/base.models';
import { StringSearchDto } from '../../../common/dtos/string.search.dto';
import { UpiRequestListFilterDto } from '../dtos/upi.request.list.filter.dto';

export class UpiRequestController extends BaseModel {
    protected endPoint = 'api/b/upi-request';

    async list() {
        this.api = `${this.endPoint}/search`;
        this.bodyDto = UpiRequestListFilterDto;

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
